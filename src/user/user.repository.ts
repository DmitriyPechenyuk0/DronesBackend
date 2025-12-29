import { UserRepositoryContract } from "./user.types";
import { PRISMA_CLIENT } from "../config/client";

export const UserRepository: UserRepositoryContract = {
	async createUser(email, password, username) {
		try {
			const existingUser = await PRISMA_CLIENT.user.findUnique({
				where: { email },
			});
			if (existingUser) {
				return "duplicate";
			}
			const user = await PRISMA_CLIENT.user.create({
				data: {
					email,
					password,
					username,
					name: "",
					surname: "",
				},
			});
			return "created";
		} catch (error) {
			console.error(error);
			return null;
		}
	},
	async updateUser(data) {
		try {
			const user = await PRISMA_CLIENT.user.update({
				where: { id: data.id },
				data,
			});
			return user;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	async updateUserPassword(userId, password) {
		try {
			const user = await PRISMA_CLIENT.user.update({
				where: { id: userId },
				data: { password },
			});
			return user;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	async getById(userId) {
		try {
			const user = await PRISMA_CLIENT.user.findUnique({
				where: { id: userId },
			});
			return user;
		} catch (error) {
			console.error(error);
			return null;
		}
	},

	async getOrders(orderId) {
		try {
			const order = await PRISMA_CLIENT.order.findUnique({
				where: { id: orderId },
				include: {
					orderDetails: true,
				},
			});
			return order;
		} catch (error) {
			console.error(error);
			return null;
		}
	},
	async cancelOrder(orderId) {
		try {
			const order = await PRISMA_CLIENT.order.delete({
				where: { id: orderId },
			});
			return null;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	async getAddresses(userId) {
		try {
			const addresses = await PRISMA_CLIENT.address.findMany({
				where: { userId },
			});
			return addresses;
		} catch (error) {
			console.error(error);
			return [];
		}
	},
	async createAddress(data) {
		const { id, userId, city, street, houseNumber, flat, entrance } = data;
		try {
			const address = await PRISMA_CLIENT.address.create({
				data: {
					id,
					userId,
					city,
					street,
					houseNumber,
					flat,
					entrance,
				},
			});
			return address;
		} catch (error) {
			console.error(error);
			return null;
		}
	},
	async deleteAddress(addressId) {
		try {
			await PRISMA_CLIENT.address.delete({
				where: { id: addressId },
			});
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	},
	async updateAddress(addressId, data) {
		try {
			const address = await PRISMA_CLIENT.address.update({
				where: { id: addressId },
				data,
			});
			return address;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	async getByEmail(email) {
		try {
			const user = await PRISMA_CLIENT.user.findUnique({
				where: { email },
			});
			return user;
		} catch (error) {
			console.error(error);
			return null;
		}
	},
};
