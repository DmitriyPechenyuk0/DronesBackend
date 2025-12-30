import { PRISMA_CLIENT } from "../config/client";
import { UserRepositoryContract } from "./user.types";

export const UserRepository: UserRepositoryContract = {
	findByEmail: async (email) => {
		try {
			return await PRISMA_CLIENT.user.findUnique({
				where: { email },
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	findById: async (id) => {
		try {
			return await PRISMA_CLIENT.user.findUnique({
				where: { id },
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	create: async (data) => {
		try {
			return await PRISMA_CLIENT.user.create({
				data: {
					email: data.email,
					password: data.password,
					firstname: data.firstname,
					secondname: data.secondname,
				},
			});
		} catch (error) {
			console.log(error);
			throw new Error("User create error");
		}
	},

	getAddress: async (userId) => {
		try {
			return await PRISMA_CLIENT.address.findUnique({
				where: {
					userId,
				},
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	saveRecoveryCode: async (userId, code) => {
		try {
			await PRISMA_CLIENT.user.update({
				where: { id: userId },
				data: {
					recoveryCode: code,
				},
			});
		} catch (error) {
			console.log(error);
			throw new Error("Save recovery code error");
		}
	},

	findUserIdByRecoveryCode: async (code) => {
		try {
			const user = await PRISMA_CLIENT.user.findFirst({
				where: { recoveryCode: code },
				select: { id: true },
			});

			return user?.id ?? null;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	updatePassword: async (userId, password) => {
		try {
			await PRISMA_CLIENT.user.update({
				where: { id: userId },
				data: {
					password,
					recoveryCode: null,
				},
			});
		} catch (error) {
			console.log(error);
			throw new Error("Update password error");
		}
	},

	getOrderStatus: async (userId) => {
		try {
			return await PRISMA_CLIENT.order.findFirst({
				where: {
					userId,
				},
				select: {
					status: true,
				},
				orderBy: {
					createdAt: "desc",
				},
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
