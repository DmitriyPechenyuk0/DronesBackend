import { ProductService } from "./product.service";
import {
	ProductControllerContract,
	ProductGetByIdSuccessResponse,
} from "./product.types";

export const ProductController: ProductControllerContract = {
	getAll: async (req, res) => {
		try {
			let {
				page,
				limit,
				skip,
				take,
				category_id,
				min_price,
				max_price,
				discount,
			} = req.query;

			let parsedPage = +(page || 1);
			let parsedLimit = +(limit || 30);
			let parsedSkip = skip ? +skip : undefined;
			let parsedTake = take ? +take : undefined;
			let parsedCategoryId = category_id ? +category_id : undefined;
			let parsedMinPrice = min_price ? +min_price : undefined;
			let parsedMaxPrice = max_price ? +max_price : undefined;
			let parsedDiscount = discount === "true";

			let errorMessage: string | null = null;

			switch (true) {
				case isNaN(parsedPage) || parsedPage < 1:
					errorMessage = "Invalid page parameter";
					break;
				case isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100:
					errorMessage = "Invalid limit parameter";
					break;
				case parsedSkip !== undefined && isNaN(parsedSkip):
					errorMessage = "Invalid skip parameter";
					break;
				case parsedTake !== undefined && isNaN(parsedTake):
					errorMessage = "Invalid take parameter";
					break;
				case parsedCategoryId !== undefined && isNaN(parsedCategoryId):
					errorMessage = "Invalid category_id parameter";
					break;
				case parsedMinPrice !== undefined && isNaN(parsedMinPrice):
					errorMessage = "Invalid min_price parameter";
					break;
				case parsedMaxPrice !== undefined && isNaN(parsedMaxPrice):
					errorMessage = "Invalid max_price parameter";
					break;
				case discount !== undefined &&
					discount !== "true" &&
					discount !== "false":
					errorMessage = "Invalid discount parameter";
					break;
			}
			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
			}
			const query = {
				page: parsedPage,
				limit: parsedLimit,
				skip: parsedSkip,
				take: parsedTake,
				category_id: parsedCategoryId,
				min_price: parsedMinPrice,
				max_price: parsedMaxPrice,
				discount: parsedDiscount,
			};

			let products = await ProductService.getAll(query);

			res.status(200).json(products);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				message: "Server error",
			});
		}
	},
	getById: async (req, res) => {
		try {
			let parsedId = +req.params.id;
			let errorMessage = "";

			switch (true) {
				case isNaN(parsedId) || parsedId < 1:
					errorMessage = "Invalid id path parameter";
					break;
			}
			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
			}
			let product = await ProductService.getById(parsedId);

			res.status(200).json(product);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				message: "Server error",
			});
		}
	},
	create: async (req, res) => {
		try {
			let { name, price, discount, category_id, blocks, amount } =
				req.body;
			let errorMessage: string | null = null;
			switch (true) {
				case typeof name !== "string" || name.length < 3:
					errorMessage = "Invalid name";
					break;
				case typeof price !== "number" || price <= 0:
					errorMessage = "Invalid price";
					break;
				case typeof amount !== "number" || amount < 0:
					errorMessage = "Invalid amount";
					break;
				case typeof discount !== "number" || discount < 0:
					errorMessage = "Invalid discount";
					break;
				case typeof category_id !== "number" ||
					!Number.isInteger(category_id) ||
					category_id <= 0:
					errorMessage = "Invalid category_id";
					break;

				default:
					break;
			}

			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
			}

			let product = await ProductService.create(req.body);
			res.status(201).json(product);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				message: "Server error",
			});
		}
	},
	fullUpdate: async (req, res) => {
		try {
			let { name, price, discount, category_id, blocks, amount } =
				req.body;
			let errorMessage: string | null = null;
			let parsedId = +req.params.id;
			switch (true) {
				case typeof name !== "string" || name.length < 3:
					errorMessage = "Invalid name";
					break;
				case typeof price !== "number" || price <= 0:
					errorMessage = "Invalid price";
					break;
				case typeof amount !== "number" || amount < 0:
					errorMessage = "Invalid amount";
					break;
				case typeof discount !== "number" || discount < 0:
					errorMessage = "Invalid discount";
					break;
				case typeof category_id !== "number" ||
					!Number.isInteger(category_id) ||
					category_id <= 0:
					errorMessage = "Invalid category_id";
					break;
				case isNaN(parsedId):
					errorMessage = "Invalid product id";
					break;

				default:
					break;
			}

			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
			}

			let product = await ProductService.fullUpdate(req.body, parsedId);
			res.status(200).json(product);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				message: "Server error",
			});
		}
	},

	delete: async (req, res) => {
		try {
			let parsedId = +req.body.id;
			let errorMessage: string | null = null;
			switch (true) {
				case isNaN(parsedId) || parsedId < 1:
					errorMessage = "Invalid id parameter";
					break;
				default:
					break;
			}

			if (errorMessage) {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
				return;
			}
			let result = await ProductService.delete(parsedId);

			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				message: "Server error",
			});
		}
	},
};
