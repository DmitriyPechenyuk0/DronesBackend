import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "./user.repository";
import {
	UserServiceContract,
	UserMessageResponse,
	UserSuccessResponse,
	UserTokenResponse,
} from "./user.types";

const JWT_SECRET = "JWT_SECRET";

export const UserService: UserServiceContract = {
	register: async (data) => {
		try {
			const { email, password, name } = data;

			const existingUser = await UserRepository.findByEmail(email);
			if (existingUser) {
				return {
					success: false,
					message: "Validation error",
				};
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			await UserRepository.create({
				id: 0,
				email,
				password: hashedPassword,
				firstname: name,
				secondname: "",
			});

			return {
				success: true,
				message: "",
			};
		} catch (error) {
			console.error(error);
			return {
				success: false,
				message: "Server error",
			};
		}
	},

	login: async (data) => {
		try {
			const { email, password } = data;

			const user = await UserRepository.findByEmail(email);
			if (!user) {
				return { success: false, message: "Invalid credentials" };
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return { success: false, message: "Invalid credentials" };
			}

			const token = jwt.sign({ id: user.id }, JWT_SECRET, {
				expiresIn: "1d",
			});

			const response: UserSuccessResponse<UserTokenResponse> = {
				success: true,
				data: { token },
			};

			return response;
		} catch (error) {
			console.error(error);
            return { success: false, message: "Server error" };
		}
	},

	getMe: async (userId) => {
		try {
			const user = await UserRepository.findById(userId);
			if (!user) {
				return { success: false, message: "Unauthorized" };
			}

			const { password, ...safeUser } = user;

			return {
				success: true,
				data: safeUser,
			};
		} catch (error) {
			console.error(error);
			return { success: false, message: "Server error" };
		}
	},

	getAddress: async (userId) => {
		try {
			const address = await UserRepository.getAddress(userId);
			if (!address) {
				return { success: false, message: "" };
			}

			return {
				success: true,
				data: address,
			};
		} catch (error) {
			console.error(error);
			return { success: false, message: "Server error" };
		}
	},

	requestRecovery: async (email) => {
		try {
			const user = await UserRepository.findByEmail(email);
			if (!user) {
				return { success: false, message: "Invalid email" };
			}

			const recoveryCode = Math.random().toString(36).substring(2, 8);
			await UserRepository.saveRecoveryCode(user.id, recoveryCode);

			return { success: true, message: "" };
		} catch (error) {
			console.error(error);
			return { success: false, message: "Server error" };
		}
	},

	resetPassword: async (code, password) => {
		try {
			if (password.length < 8) {
				return { success: false, message: "Invalid password" };
			}

			const userId = await UserRepository.findUserIdByRecoveryCode(code);
			if (!userId) {
				return { success: false, message: "Invalid password" };
			}

			const hashedPassword = await bcrypt.hash(password, 10);
			await UserRepository.updatePassword(userId, hashedPassword);

			return { success: true, message: "" };
		} catch (error) {
			console.error(error);
			return { success: false, message: "Server error" };
		}
	},

	getOrderStatus: async (userId) => {
		try {
			const status = await UserRepository.getOrderStatus(userId);
			if (!status) {
				return { success: false, message: "Unauthorized" };
			}

			return {
				success: true,
				data: status,
			};
		} catch (error) {
			console.error(error);
			return { success: false, message: "Server error" };
		}
	},
};
