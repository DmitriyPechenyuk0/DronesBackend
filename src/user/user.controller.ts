import { userService } from "./user.service";
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
            let { password, email, } = req.body
        } catch (error) {
            
        }
    },
};
