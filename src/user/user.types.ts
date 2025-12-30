import { JwtPayload } from "jsonwebtoken";
import { Prisma } from "../generated/prisma";
import { Request, Response } from "express";

export interface UserCreate {
	email: string;
	password: string;
	name: string;
}

export type OrderDetailsType = Prisma.OrderDetailGetPayload<{}>;
export type OrderType = Prisma.OrderGetPayload<{
	include: {
		orderDetails: true;
	};
}>;
export type AddressType = Prisma.AddressGetPayload<{}>;
export type UserType = Prisma.UserGetPayload<{}>;
export type UserCreateType = Prisma.UserUncheckedCreateInput;

export interface UserErrorResponse {
	success: false;
	message: string;
}

export interface UserSuccessResponse {
	success: true;
	data: {};
}

export interface UserLoginSuccessResponse {
	success: true
	data: {
		jwt: string;
	};
}

export interface UserMeSuccessResponse {
	success: true;
	data: {
		id: number;
		email: string;
		firstname: string;
		secondname: string;
		thirdname: string;
		birthdate: string;
		number: number;
	};
}

export interface UserAddressesSuccessResponse {
	success: true;
	data: {
		id: number;
		city: string;
		street: string;
		house: string;
		apartment: string;
		entrance: number;
	}[];
}
export interface UserMePatch {
	id: number;
	email: string;
	firstname: string;
	secondname: string;
	thirdname: string;
	birthdate: string;
	number: number;
}

export interface UserAddressesPatch {
	id: number;
	city: string;
	street: string;
	house: string;
	apartment: string;
	entrance: number;
}

export interface UserAddressesPatchSuccessResponse {
	success: true;
	data: {
		id: number;
		city: string;
		street: string;
		house: string;
		apartment: string;
		entrance: number;
	};
}

export interface UserOrderSuccessResponse {
	success: true;
	data: {
		orders: {
			name: string;
			secondName: string;
			middleName: string;
			orderId: number;
			orderDate: string;
			trackingNumber: number;
			deliveryAddress: string;
			paymentMethod: string;
			items: {
				id: 1;
				name: string;
				image: string;
				quantity: number;
				price: number;
			}[];
			fullPrice: number;
			discount: number;
			priceReduced: number;
		}[];
	};
}

export interface UserOrderStatusSuccessResponse {
	success: true;
	data: {
		orders: {
			trackingNumber: number;
			status: string;
		}[];
	};
}

export interface Support {
	name: string;
	number: string;
	email: string;
	description: string;
}

export interface UserServiceContract {
	register(
		userData: UserCreate,
	): Promise<UserSuccessResponse | UserErrorResponse>;
	login(
		email: string,
		password: string,
	): Promise<UserErrorResponse | UserLoginSuccessResponse>;
	recovery(email: string): Promise<UserSuccessResponse | UserErrorResponse>;
	// recoveryCode(
	// 	code: string,
	// 	password: string,
	// ): Promise<UserSuccessResponse | UserErrorResponse>;
	// me(jwt: string): Promise<UserErrorResponse | UserMeSuccessResponse>;
	// addresses(
	// 	jwt: string,
	// ): Promise<UserErrorResponse | UserAddressesSuccessResponse>;
	// patchMe(
	// 	jwt: string,
	// 	body: UserMePatch,
	// ): Promise<UserErrorResponse | UserMeSuccessResponse>;
	// patchAddresses(
	// 	jwt: string,
	// 	body: UserAddressesPatch,
	// ): Promise<UserErrorResponse | UserAddressesPatchSuccessResponse>;
	// postAddresses(
	// 	jwt: string,
	// 	body: UserAddressesPatch,
	// ): Promise<UserErrorResponse | UserAddressesPatchSuccessResponse>;
	// deleteAddresses(
	// 	jwt: string,
	// 	id: number,
	// ): Promise<UserErrorResponse | UserSuccessResponse>;
	// orders(jwt: string): Promise<UserErrorResponse | UserOrderSuccessResponse>;
	// orderCancel(
	// 	jwt: string,
	// 	orderId: number,
	// ): Promise<UserErrorResponse | UserSuccessResponse>;
	// orderStatus(
	// 	jwt: string,
	// ): Promise<UserErrorResponse | UserOrderStatusSuccessResponse>;
	support(
		message: Support,
	): Promise<UserErrorResponse | UserSuccessResponse>;
}

export interface UserRepositoryContract {
	getOrders(orderId: number): Promise<OrderType | null>;
	cancelOrder(orderId: number): Promise<null>;
	getAddresses(userId: number): Promise<AddressType[]>;
	createAddress(data: AddressType): Promise<AddressType | null>;
	deleteAddress(addressId: number): Promise<boolean>;
	updateAddress(addressId: number, data: AddressType): Promise<AddressType>;
	createUser(
		email: string,
		password: string,
		name: string,
	): Promise<"created" | "duplicate" | null>;
	updateUser(data: UserType): Promise<UserType>;
	updateUserPassword(userId: number, password: string): Promise<UserType>;
	getByEmail(email: string): Promise<UserType | null>;
	getById(userId: number): Promise<UserType | null>;
	userSetRecovery(email: string, code: string): Promise<string>
	userClearRecovery(email: string): Promise<string>
}

interface ControllerSupportBody {
	name: string
	number: string
	email: string
	description: string
}
interface ControllerLoginBody {
	email: string
	password: string
}
interface ControllerRegisterBody {
	name: string
	password: string
	email: string
}
interface ControllerSuccessResponse {
	success: true,
	data: {}
}
interface ControllerErrorResponse {
	success: false,
	message: string
}
interface ControllerRecoveryBody{
	email: string
}
interface ControllerRecoveryCodeBody{
	password: string
}
export interface UserControllerContract {
	register: (req: Request<object, ControllerSuccessResponse | ControllerErrorResponse, ControllerRegisterBody>, res: Response<ControllerSuccessResponse | ControllerErrorResponse>) => Promise<void>
	login: (req: Request<object, ControllerSuccessResponse | ControllerErrorResponse, ControllerLoginBody>, res: Response<ControllerSuccessResponse | ControllerErrorResponse>) => Promise<void>
	recovery: (req: Request<object, ControllerSuccessResponse | ControllerErrorResponse, ControllerRecoveryBody>, res: Response<ControllerSuccessResponse | ControllerErrorResponse>) => Promise<void>
	recoveryCode: (req: Request<{code: string}, ControllerSuccessResponse | ControllerErrorResponse, ControllerRecoveryCodeBody>, res: Response<ControllerSuccessResponse | ControllerErrorResponse>) => Promise<void>
	support: (req: Request<object, ControllerSuccessResponse | ControllerErrorResponse, ControllerSupportBody>, res: Response<ControllerSuccessResponse | ControllerErrorResponse>) => Promise<void>

}