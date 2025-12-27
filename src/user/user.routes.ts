import {Router} from 'express';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const UserRouter = Router();

UserController.post('users/register', UserController.register);
UserController.post('users/login', UserController.login);
UserController.patch('users/recovery', UserController.resetPassword);
UserController.patch('users/recovery/:code', UserController.setNewPassword);
UserController.get('users/me', UserController.getUserInfo);
UserController.get('users/me/adresses', UserController.getUserAdresses);
UserController.patch('users/me', UserController.updateUserDate);
UserController.patch('users/me/addresses', UserController.updateAddress);
UserController.post('users/me/addresses', UserController.createAddress);
UserController.delete('users/me/adresses', UserController.deleteAddress);
UserController.get('users/me/order', UserController.loadAllOrders);
UserController.post('users/me/order/cancel', UserController.cancelOrder);
UserController.get('users/me/order-status', UserController.getOrderStatus)
UserController.post('/support', UserController.support);


export default UserRouter;