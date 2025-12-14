import { PRISMA_CLIENT } from "../config/client";
import { ProductCreateBody, ProductRepositoryContract } from "./product.types";

function mapBlocksToPrismaCreate(blocks: ProductCreateBody["blocks"]) {
	return {
		create: blocks.map((block) => ({
			header: block.header,
			description: block.description,
			image: block.image,
			techDetails: {
				create: block.details.map((detail) => ({
					characteristic: detail.characteristic,
					description: detail.description,
				})),
			},
		})),
	};
}
export const ProductRepository: ProductRepositoryContract = {
	getAll: async (skip, take, category_id, min_price, max_price, discount) => {
		try {
			console.log(discount, typeof discount);
			return PRISMA_CLIENT.product.findMany({
				...(skip !== undefined && { skip }),
				...(take !== undefined && { take }),
				where: {
					...(category_id ? { categoryId: category_id } : {}),

					...(min_price ? { price: { gte: min_price } } : {}),
					...(max_price ? { price: { lte: max_price } } : {}),
					// Дисконт на потом
					// ...(discount !== undefined ? { discount: discount ? { gt: 0 } : { equals: 0 }} : {} )
				},
				include: {
					category: true,
				},
			});
		} catch (error) {
			console.log(error);
			return [];
		}
	},
	getById: async (id) => {
		try {
			return PRISMA_CLIENT.product.findUnique({
				where: {
					id: id,
				},
				include: {
					category: true,
					blocks: {
						include: {
							techDetails: true,
						},
					},
				},
			});
		} catch (error) {
			console.log(error);
			throw Error;
		}
	},
	create: async (product) => {
		try {
			let { name, price, discount, category_id, blocks, amount } =
				product;

			const blocksPrismaFormat = mapBlocksToPrismaCreate(blocks);

			const categoryExists = await PRISMA_CLIENT.category.findUnique({
				where: { id: category_id },
			});

			if (!categoryExists) {
				throw new Error(`category not found`);
			}

			return PRISMA_CLIENT.product.create({
				data: {
					name,
					price,
					discount,
					amount,

					category: {
						connect: {
							id: category_id,
						},
					},

					blocks: blocksPrismaFormat,
				},

				include: {
					category: true,
					blocks: {
						include: {
							techDetails: true,
						},
					},
				},
			});
		} catch (error) {
			throw new Error("undefined error");
		}
	},
};
