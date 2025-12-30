import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../middlewares";

export const UserRouter = Router();

UserRouter.post("/users/register", UserController.register);
// UserRouter.post("users/login", UserController.login);
// UserRouter.patch("users/recovery", UserController.resetPassword);
// UserRouter.patch("users/recovery/:code", UserController.setNewPassword);

// UserRouter.get("users/me", authMiddleware, UserController.getUserInfo);
// UserRouter.get(
// 	"users/me/adresses",
// 	authMiddleware,
// 	UserController.getUserAdresses,
// );
// UserRouter.patch("users/me", authMiddleware, UserController.updateUserInfo);
// UserRouter.patch(
// 	"users/me/addresses",
// 	authMiddleware,
// 	UserController.updateAddress,
// );
// UserRouter.post(
// 	"users/me/addresses",
// 	authMiddleware,
// 	UserController.createAddress,
// );
// UserRouter.delete(
// 	"users/me/adresses",
// 	authMiddleware,
// 	UserController.deleteAddress,
// );
// UserRouter.get("users/me/order", authMiddleware, UserController.loadAllOrders);

// UserRouter.post(
// 	"users/me/order/cancel",
// 	authMiddleware,
// 	UserController.cancelOrder,
// );
// UserRouter.get(
// 	"users/me/order-status",
// 	authMiddleware,
// 	UserController.getOrderStatus,
// );
UserRouter.post("/support", UserController.support);


