import { UserControllerContract } from "./user.types";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "JWT_SECRET";

export const UserController: UserControllerContract = {
	register: async (req, res) => {
		try {
			const body = req.body;

			if (!body) {
				res.status(400).json({ success: false, message: "Validation error" });
				return;
			}

			const result = await UserService.register(body);
			res.status(201).json(result);
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	},

	login: async (req, res) => {
		try {
			const body = req.body;

			if (!body) {
				res.status(400).json({ success: false, message: "Invalid credentials" });
				return;
			}

			const result = await UserService.login(body);
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	},
	
	resetPassword: async (req, res) => {
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

	getOrderStatus: async (req, res) => {
		try {
			const authHeader = req.headers.authorization;

			if (!authHeader) {
				res.status(401).json({ success: false, message: "Unauthorized" });
				return;
			}

			const token = authHeader.replace("Bearer ", "");
			const payload = verify(token, JWT_SECRET) as any;

			const result = await UserService.getOrderStatus(payload.userId);
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

	getUserInfo: async (_req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;

			const result = await UserService.getMe(userId);
			res.status(200).json(result);
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	getUserAdresses: async (_req: Request, res: Response) => {
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
			res.status(200).json({ success: true, message: "user updated" });
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
			res.status(200).json({ success: true, message: "address updated" });
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
			res.status(201).json({ success: true, message: "address created" });
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	deleteAddress: async (_req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;

			await UserService.deleteAddress(userId);
			res.status(200).json({ success: true, message: "address deleted" });
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	loadAllOrders: async (_req: Request, res: Response) => {
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
			res.status(200).json({ success: true, message: "order canceled" });
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
			res.status(200).json({ success: true, message: "message sent" });
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	},

	getOrderStatus: async (_req: Request, res: Response) => {
		try {
			const userId = res.locals.userId;

			const result = await UserService.getOrderStatus(userId);
			res.status(200).json(result);
		} catch {
			res.status(500).json({ success: false, message: "server error" });
		}
	}

}