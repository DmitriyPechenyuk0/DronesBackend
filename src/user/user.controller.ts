import { UserControllerContract } from "./user.types";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import {env} from "../config/env";
import { authMiddleware } from "../middleware/auth.middleware";



export const UserController: UserControllerContract = {
	register: async (req: Request, res: Response) => {
		try {
			const {email, password, name} = req.body;

			if (!email || typeof email !== 'string') {
				res.status(400).json({ success: false, message: "Email is required" });
			}

			if (!password || typeof password !== 'string') {
				res.status(400).json({ success: false, message: "Password is required" });
			}

			if (!name || typeof name !== 'string') {
				res.status(400).json({ success: false, message: "Name is required" });
			}
			const result = await UserService.register(email, password, name);
			res.status(201).json(result);

		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	},

	login: async (req: Request, res: Response) => {
		try {
			const {email, password} = req.body;

			if (!email || typeof email !== 'string') {
				res.status(400).json({ success: false, message: "Email is required" });
			}

			if (!password || typeof password !== 'string') {
				res.status(400).json({ success: false, message: "Password is required" });
			}

			const result = await UserService.login(email, password);
			res.status(200).json(result);

		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		} 
	},

	resetPassword: async (req: Request, res: Response) => {
		try {
			const { code } = req.params;
			const body = req.body;

			if (!body?.password) {
				res.status(400).json({ success: false, message: "Invalid password" });
				return;
			}

			const result = await UserService.resetPassword(code, body.password);
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			res.status(400).json({ success: false, message: "Invalid password" });
		}
	},

	getOrderStatus: async (req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;

			const result = await UserService.getOrderStatus(userId);
			
			res.status(200).json(result);

		} catch (error) {
			console.log(error);
			res.status(401).json({ success: false, message: "Unauthorized" });
		}
	},

	setNewPassword: async (req: Request, res: Response) => {
		try {
			const { code } = req.params;
			const { password } = req.body;

			if (!code || !password) {
				res.status(400).json({ success: false, message: "code and password are required" });
				return;
			}

			const result = await UserService.resetPassword(code, password);
			res.status(200).json(result);
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	getUserInfo: async (req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;

			const result = await UserService.getMe(userId);
			res.status(200).json(result);
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	getUserAdresses: async (req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;

			const result = await UserService.getAddress(userId);
			res.status(200).json(result);
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	updateUserDate: async (req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;
			const data = req.body;

			if (!data) {
				res.status(400).json({ success: false, message: "body is required" });
				return;
			}

			await UserService.updateUser(userId, data);
			res.status(200).json({ success: true, data: {} });
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	updateAddress: async (req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;
			const data = req.body;

			if (!data) {
				res.status(400).json({ success: false, message: "body is required" });
				return;
			}

			await UserService.updateAddress(userId, data);
			res.status(200).json({ success: true, data: {} });
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	createAddress: async (req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;
			const data = req.body;

			if (!data) {
				res.status(400).json({ success: false, message: "body is required" });
				return;
			}

			await UserService.createAddress(userId, data);
			res.status(201).json({ success: true, data: {} });
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	deleteAddress: async (req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;

			await UserService.deleteAddress(userId);
			res.status(200).json({ success: true, data: {} });
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	loadAllOrders: async (req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;

			const orders = await UserService.loadAllOrders(userId);
			res.status(200).json({ success: true, data: orders });
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	cancelOrder: async (req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;
			const { orderId } = req.body;

			if (!orderId) {
				res.status(400).json({ success: false, message: "orderId is required" });
				return;
			}

			await UserService.cancelOrder(userId, orderId);
			res.status(200).json({ success: true, data: {} });
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	support: async (req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;
			const { message } = req.body;

			if (!message) {
				res.status(400).json({ success: false, message: "message is required" });
				return;
			}

			await UserService.support(userId, message);
			res.status(200).json({ success: true, data: {} });
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	getOrderStatus: async (req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;

			const result = await UserService.getOrderStatus(userId);
			res.status(200).json(result);
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	}

}