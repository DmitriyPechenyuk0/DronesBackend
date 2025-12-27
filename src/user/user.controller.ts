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

	getMe: async (req, res) => {
		try {
			const authHeader = req.headers.authorization;

			if (!authHeader) {
				res.status(401).json({ success: false, message: "Unauthorized" });
				return;
			}

			const token = authHeader.replace("Bearer ", "");

			let payload;
			try {
				payload = verify(token, JWT_SECRET) as any;
			} catch (error) {
				if (error instanceof TokenExpiredError) {
					res.status(401).json({ success: false, message: "Unauthorized" });
					return;
				}

				res.status(401).json({ success: false, message: "Unauthorized" });
				return;
			}

			const result = await UserService.getMe(payload.userId);
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	},

	getAddress: async (req, res) => {
		try {
			const authHeader = req.headers.authorization;

			if (!authHeader) {
				res.status(401).json({ success: false, message: "Unauthorized" });
				return;
			}

			const token = authHeader.replace("Bearer ", "");
			const payload = verify(token, JWT_SECRET) as any;

			const result = await UserService.getAddress(payload.userId);
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			res.status(401).json({ success: false, message: "Unauthorized" });
		}
	},

	requestRecovery: async (req, res) => {
		try {
			const body = req.body;

			if (!body?.email) {
				res.status(400).json({ success: false, message: "Invalid email" });
				return;
			}

			const result = await UserService.requestRecovery(body.email);
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			res.status(400).json({ success: false, message: "Invalid email" });
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

	delete: asunc(req, res) => {
		try {
			const authHeader = req.headers.authorization;
			if (!authHeader) {
				res.status(401).json({ success: false, message: "Unauthorized" });
	}
};