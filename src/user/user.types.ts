import { Prisma } from "../generated/prisma";

export type User = Prisma.UserGetPayload<{}>;

export type UserAddress = Prisma.AddressGetPayload<{}>;

export type UserOrderStatus = {
	status: string;
};

export interface UserRegisterBody {
	email: string;
	password: string;
	name: string;
}

export interface UserLoginBody {
	email: string;
	password: string;
}

export interface UserRecoveryBody {
	email: string;
}

export interface UserResetPasswordBody {
	password: string;
}

export interface UserMessageResponse {
	success: boolean;
	message: string;
}

export interface UserSuccessResponse<T> {
	success: true;
	data: T;
}

export interface UserTokenResponse {
	token: string;
}


export interface UserControllerContract {
    register: (req: UserRegisterBody) => Promise<UserMessageResponse>;

    login: (req: UserLoginBody) => Promise<UserMessageResponse | UserSuccessResponse<UserTokenResponse>>;

    setNewPassword: (code: string, password: string) => Promise<UserMessageResponse>;

	getUserInfo: (userId: number) => Promise<UserMessageResponse | UserSuccessResponse<Omit<User, "password">>>;

	getUserAdresses: (userId: number) => Promise<UserMessageResponse | UserSuccessResponse<UserAddress>>;

	updateUserDate: (userId: number, data: Partial<User>) => Promise<UserMessageResponse>;

	updateAddress: (userId: number, data: Partial<UserAddress>) => Promise<UserMessageResponse>;

	createAddress: (userId: number, data: Partial<UserAddress>) => Promise<UserMessageResponse>;

	deleteAddress: (userId: number) => Promise<UserMessageResponse>;

	loadAllOrders: (userId: number) => Promise<UserMessageResponse>;

	cancelOrder: (userId: number, orderId: number) => Promise<UserMessageResponse>;

	support: (userId: number, message: string) => Promise<UserMessageResponse>;
    
    resetPassword: (code: string, password: string) => Promise<UserMessageResponse>;

    getOrderStatus: (userId: number) => Promise<UserMessageResponse | UserSuccessResponse<UserOrderStatus>>;
}


export interface UserServiceContract {
	register: (data: UserRegisterBody) => Promise<UserMessageResponse>;

	login: (
		data: UserLoginBody,
	) => Promise<UserMessageResponse | UserSuccessResponse<UserTokenResponse>>;

	getMe: (
		userId: number,
	) => Promise<UserMessageResponse | UserSuccessResponse<Omit<User, "password">>>;

	getAddress: (
		userId: number,
	) => Promise<UserMessageResponse | UserSuccessResponse<UserAddress>>;

	requestRecovery: (email: string) => Promise<UserMessageResponse>;

	resetPassword: (
		code: string,
		password: string,
	) => Promise<UserMessageResponse>;

	getOrderStatus: (
		userId: number,
	) => Promise<UserMessageResponse | UserSuccessResponse<UserOrderStatus>>;
}



export interface UserRepositoryContract {
	findByEmail: (email: string) => Promise<User | null>;
	findById: (id: number) => Promise<User | null>;
	create: (data: {
		email: string;
		password: string;
		firstname: string;
		secondname: string;
	}) => Promise<User>;
	getAddress: (userId: number) => Promise<UserAddress | null>;
	saveRecoveryCode: (userId: number, code: string) => Promise<void>;
	findUserIdByRecoveryCode: (code: string) => Promise<number | null>;
	updatePassword: (userId: number, password: string) => Promise<void>;
	getOrderStatus: (userId: number) => Promise<UserOrderStatus | null>;
}