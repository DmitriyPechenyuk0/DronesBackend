import bcrypt from "bcryptjs";
import {
	sign,
	verify,
	JwtPayload,
	JsonWebTokenError,
	TokenExpiredError,
} from "jsonwebtoken";
import { UserRepository } from "./user.repository";
import { UserServiceContract } from "./user.types";
import { env } from "../config/env";
import { transporter } from "../config";

export function verifyAndDecodeJwt(token: string): JwtPayload | null {
	try {
		const decoded = verify(token, env.SECRET_KEY) as JwtPayload;
		return decoded;
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			console.error("token was expired");
		} else if (error instanceof JsonWebTokenError) {
			console.error("Envalid token");
		} else {
			console.error("verify error JWT:", error);
		}
		return null;
	}
}

export const userService: UserServiceContract = {
	// async login(email, password) {
	// 	try {
	// 		const user = await UserRepository.getByEmail(email);
	// 		if (user == null) {
	// 			return { success: false, message: "Invalid credentials" };
	// 		}
	// 		let isMatch = bcrypt.compare(password, user.password);

	// 		if (!user) {
	// 			return { success: false, message: "Invalid credentials" };
	// 		} else {
	// 			return {
	// 				success: true,
	// 				data: {
	// 					jwt: sign({ userId: user.id }, env.SECRET_KEY, {
	// 						expiresIn: "7d",
	// 					}),
	// 				},
	// 			};
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 		return { success: false, message: "Unhandled error" };
	// 	}
	// },
	async register(body) {
		const { password, email, name } = body;
		try {
			const cryptedPassword = await bcrypt.hash(password, 12)
			const user = await UserRepository.createUser(email, cryptedPassword, name);
			console.log(user)
			if (!user) {
				return { success: false, message: "" };
			}
			if (user === "created") {
				return { success: true, data: {} };
			}
			if (user === "duplicate") {
				return { success: false, message: "Integrity error" };
			}
			return { success: false, message: "Unhandled error" };
		} catch (error) {
			console.log(error);
			return { success: false, message: "Unhandled error" };
		}
	},
	// async me(jwt) {
	// 	try {
	// 		let decoded = verifyAndDecodeJwt(jwt);
	// 		if (!decoded || decoded.userId === undefined) {
	// 			return {
	// 				success: false,
	// 				message: "invalid JWT",
	// 			};
	// 		}
	// 		const userId: number = decoded.userId;
	// 		const userData = await UserRepository.getById(userId);
	// 		if (!userData) {
	// 			return {
	// 				success: false,
	// 				message: "User not found",
	// 			};
	// 		}
	// 		return {
	// 			success: true,
	// 			data: userData,
	// 		};
	// 	} catch (error) {
	// 		console.log(error);
	// 		return {
	// 			success: false,
	// 			message: "Unhandled error",
	// 		};
	// 	}
	// },
	support: async(parsedBody) => {
		try {
			let {name , email, number, description} = parsedBody
			await transporter.sendMail({
				from: env.PROJECT_MAIL,
				to: env.DEVELOPER_MAIL,
				subject: `🔔 New Support Ticket - ${name}`,
				html: 
				`
				Hey there,
				
				You've got a new support ticket coming through!
				<br>
				<br>

				FROM: <b>${name}</b>
				<br>
				EMAIL: <b>${email}</b>
				<br>
				PHONE: <b>${number}</b>

				<br>
				<br>
				WHAT'S UP:
				${description}

				<br>
				<br>
				Hit 'em back ASAP to keep things smooth!
				<br>
				Your Drones Support Bot 🤖
				
				`
				});
			console.log("Support message successfuly sended")
			return {
				success: true,
				data: {}
			}
		} catch (error) {
			console.log("error")
			return {
				success: false,
				message: "Unhandled error"
			}
		}
	},
};
