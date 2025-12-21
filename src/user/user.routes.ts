import {Router} from 'express';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const UserRouter = Router();

UserController.post('user/register', UserController.register);
UserController.post('user/login', UserController.login);
UserController.get('user/me', UserController.getMe);
UserController.get('user/address', UserController.getAddress);
UserController.post('user/request-recovery', UserController.requestRecovery);
UserController.post('user/reset-password', UserController.resetPassword);
UserController.get('user/order-status', UserController.getOrderStatus);

export default UserRouter;