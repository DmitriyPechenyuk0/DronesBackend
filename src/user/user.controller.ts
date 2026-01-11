import { userService, verifyAndDecodeJwt } from "./user.service";
import { UserControllerContract } from "./user.types";

export const UserController: UserControllerContract = {
    support: async(req, res) => {
        try {
            let { name, number, email, description } = req.body
            
            let errorMessage: string | null = null;
			switch (true) {
				case typeof name !== "string":
					errorMessage = "Invalid name";
					break;
				case typeof number !== "string":
					errorMessage = "Invalid number";
					break;
				case typeof email !== "string":
                    errorMessage = "Email must be a string";
                    break;
                case email.length === 0:
                    errorMessage = "Email cannot be empty";
                    break;
                case !email.includes('@'):
                    errorMessage = "Email must contain @";
                    break;
                case email.indexOf('@') === 0:
                    errorMessage = "Email cannot start with @";
                    break;
                case email.indexOf('@') === email.length - 1:
                    errorMessage = "Email cannot end with @";
                    break;
                case !email.includes('.'):
                    errorMessage = "Email must contain a domain";
                    break;
				case typeof description !== "string":
					errorMessage = "Invalid description";
					break;

				default:
					break;
			}

			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
			}
            let parsedBody = {name, email, number, description}
            await userService.support(parsedBody)

            res.status(200).json({success: true, data: {}})
        } catch (error) {
            console.log(error)
            res.status(400).json({success: false, message: 'unknown'})
        }
    },
    register: async(req, res) => {
        try {
            let { password, email, name } = req.body
            let errorMessage: string | null = null;
			switch (true) {
				case typeof password !== "string":
					errorMessage = "Invalid password";
					break;
				case typeof email !== "string":
					errorMessage = "Invalid email";
					break;
				case typeof name !== "string":
                    errorMessage = "Invalid name";
                    break;
				default:
					break;
			}

			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
			}
            const answer = await userService.register(req.body)

            res.json(answer)
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                message: "Unhandled error"
            })
        }
    },
    login: async(req, res) => {
        try {
            let { password, email } = req.body
            let errorMessage: string | null = null;
			switch (true) {
				case typeof password !== "string":
					errorMessage = "Invalid password";
					break;
				case typeof email !== "string":
					errorMessage = "Invalid email";
					break;
                case email.length === 0:
                    errorMessage = "Email cannot be empty";
                    break;
                case !email.includes('@'):
                    errorMessage = "Email must contain @";
                    break;
                case email.indexOf('@') === 0:
                    errorMessage = "Email cannot start with @";
                    break;
                case email.indexOf('@') === email.length - 1:
                    errorMessage = "Email cannot end with @";
                    break;
                case !email.includes('.'):
                    errorMessage = "Email must contain a domain";
                    break;

				default:
					break;
			}
			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
			}
            const login = await userService.login(email, password)

            res.json(login)
        } catch (error) {
            console.log(error)
            res.json( {
                success: false,
                message: 'Unhandled error'
            })
        }
    },
    recovery: async (req, res) => {
        try {
            let { email } = req.body
            let errorMessage: string | null = null;
			switch (true) {
				case typeof email !== "string":
					errorMessage = "Invalid email";
					break;
                case email.length === 0:
                    errorMessage = "Email cannot be empty";
                    break;
                case !email.includes('@'):
                    errorMessage = "Email must contain @";
                    break;
                case email.indexOf('@') === 0:
                    errorMessage = "Email cannot start with @";
                    break;
                case email.indexOf('@') === email.length - 1:
                    errorMessage = "Email cannot end with @";
                    break;
                case !email.includes('.'):
                    errorMessage = "Email must contain a domain";
                    break;

				default:
					break;
			}
			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
			}
            function generateSixDigitCode(): string {
                const randomNumber = Math.floor(Math.random() * 1000000);
                return randomNumber.toString().padStart(6, '0');
            }

            const code = generateSixDigitCode();
            
            const recovery = await userService.recovery(email, code)
            
        } catch (error) {
            console.log(error)
            res.json( {
                success: false,
                message: 'Unhandled error'
            })
        }
    },
    recoveryCode: async (req, res) => {
        try{
            let { code } = req.params
            let { password } = req.body
            let errorMessage: string | null = null;
            switch (true){
                case typeof code !== "string":
                    errorMessage = "Invalid code";
                    break;
                case typeof password !== "string":
                    errorMessage = "Invalid password";
                    break;
                default:
                    break;
            }
            if (errorMessage) {
                res.status(400).json({
                    success: false,
                    message: errorMessage,
                });
            }
            if (!res.locals.jwt){
                res.json({
                success: false,
                message: "invalid JWT",
                })
            }
            let decoded = verifyAndDecodeJwt(res.locals.jwt);
            if (!decoded || decoded.userId === undefined) {
                res.status(401).json({
                    success: false,
                    message: "invalid JWT",
                })
                return;
            }
            const userId: number = decoded.userId;
            const recoveryCode = await userService.recoveryCode(userId, password)
            res.status(200).json({
                success: true,
                data: {},
            })
        }catch (error) {
            console.log(error)
            res.json( {
                success: false,
                message: 'Unhandled error'
            })
        }
    },
    getUserInfo: async (req, res): Promise<void> => {
        try{
            const getUserInfo = await userService.me(res.locals.jwt)
            res.status(200).json({
                success: true,
                data: getUserInfo
            });
        }catch (error) {
            console.log(error)
            res.json( {
                success: false,
                message: 'Unhandled error'
            })
        }
    },
    getAddressesInfo: async (req, res) => {
        try{
            const getUserAddresses = await userService.addresses(res.locals.jwt)
            res.status(200).json({
                success: true,
                data: getUserAddresses
            });
        }catch (error) {
            console.log(error)
            res.json( {
                success: false,
                message: 'Unhandled error'
            })
        }
    },

    updateUser: async (req, res) => {
        try {
            let user = req.body
            if (typeof user !== "object") {
                res.status(400).json({
                    success: false,
                    message: "Invalid user data",
                });
            }
            const updateUserDate = await userService.patchMe(res.locals.jwt, user)
            res.status(200).json({
                success: true,
                data: updateUserDate
            });
            
        } catch (error) {
            console.log(error)
            res.json( {
                success: false,
                message: 'Unhandled error'
            })
        }
    },

    updateAddress: async (req, res) => {
        try {
            let adress = req.body
            if (typeof adress !== "object") {
                res.status(400).json({
                    success: false, 
                    message: "Invalid adress data",
                });
            }
            const updateAddress = await userService.patchAddresses(res.locals.jwt, adress)
            res.status(200).json({
                success: true,
                data: updateAddress
            });
        } catch (error) {
            console.log(error)
            res.json( {
                success: false,
                message: 'Unhandled error'
            })
        }
    },
    createAdress: async (req, res) => {
        try {
            let adress = req.body
            if (typeof adress !== "object") {
                res.status(400).json({
                    success: false,
                    message: "Invalid adress data",
                });
            }
            const createAdress = await userService.postAddresses(res.locals.jwt, adress)
            res.status(200).json({
                success: true,
                data: createAdress
            });
        } catch (error) {
            console.log(error)
            res.json( {
                success: false,
                message: 'Unhandled error'
            })
        }
    },

    deleteAdress: async (req, res) => {
        try{
            let {adress} = req.body
            if (typeof adress !== "number") {
                res.status(400).json({
                    success: false,
                    message: "Invalid adress id",
                });
            }
            userService.deleteAddresses(adress)
            res.status(200).json({
                success: true,
                data: {}
            });
        }catch (error) {
            console.log(error)
            res.json( {
                success: false,
                message: 'Unhandled error'
            })
        }
    },

    cancelOrders: async (req, res) => {
        try{
            let orderId = req.body
            if (typeof orderId !== "number") {
                res.status(400).json({
                    success: false,
                    message: "Invalid order id",
                });
            }
            userService.orderCancel(orderId)
            res.status(200).json({
                success: true,
                data: {}
            });
        } catch (error) {
            console.log(error)
            res.json( {
                success: false,
                message: 'Unhandled error'
            })
        }
    },
    getOrderStatus: async (req, res) => {
        try{
            let orders = req.body

            if (typeof orders !== "object") {
                res.status(400).json({
                    success: false,
                    message: "Invalid orders",
                });
            }
            const getOrderStatus = await userService.orderStatus(orders)
            res.status(200).json({
                success: true,
                data: getOrderStatus
            });
        } catch (error) {
            console.log(error)
            res.json( {
                success: false,
                message: 'Unhandled error'
            })
        }
    },
    getUserOrders: async (req, res) => {
        try{
            const getUserOrders = await userService.orders(res.locals.jwt)
            res.status(200).json({
                success: true,
                data: getUserOrders
            });
        }catch (error) {
            console.log(error)
            res.json( {
                success: false,
                message: 'Unhandled error'
            })
        }   
    },
};