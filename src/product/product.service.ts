import { privateDecrypt } from "crypto";
import { ProductRepository } from "./product.repository";
import {
	ProductErrorResponse,
	ProductGetAllSuccessResponse,
	ProductGetByIdResponse,
	ProductGetByIdSuccessResponse,
	ProductServiceContract,
	ProductWhereInput,
	Product
} from "./product.types";
import { DuplicateError } from "./errors";

export const ProductService: ProductServiceContract = {
	getAll: async (query) => {
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
			} = query;

			const products = await ProductRepository.getAll(
				skip,
				take,
				category_id,
				min_price,
				max_price,
				discount,
			);
			let response: ProductGetAllSuccessResponse = {
				success: true,
				data: {
					products: products ?? [],
				},
			};
			return response;
		} catch (error) {
			console.log(error);
			let response: ProductErrorResponse = {
				success: false,
				message: "Server error",
			};
			return response;
		}
	},
	getById: async (id) => {
		try {
			const product = await ProductRepository.getById(id);

			let response: ProductGetByIdSuccessResponse = {
				success: true,
				data: product,
			};
			return response;
		} catch (error) {
			console.log(error);
			let response: ProductErrorResponse = {
				success: false,
				message: "Server error",
			};
			return response;
		}
	},
	create: async (product) => {
		try {
			const createdProduct = await ProductRepository.create(product);

			const response: ProductGetByIdSuccessResponse = {
				success: true,
				data: createdProduct,
			};
			return response;
		} catch (error) {
			let errorMessage = "Server Error";

			if (error instanceof DuplicateError) {
				errorMessage = error.message;
			} else {
				console.error("unhandled err: ", error);
			}

			const errorResponse: ProductErrorResponse = {
				success: false,
				message: errorMessage,
			};

			return errorResponse;
		}
	},
	fullUpdate: async (product, id) => {
		try {
			const updatedProduct = await ProductRepository.fullUpdate(
				product,
				id,
			);

			return updatedProduct;
		} catch (error) {
			let errorMessage = "Server Error";
			console.error("unhandled err: ", error);

			const errorResponse: ProductErrorResponse = {
				success: false,
				message: errorMessage,
			};

			return errorResponse;
		}
	},
	delete: async (id) => {
		try {
			let deleted = await ProductRepository.delete(id);
			return null;
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: "Server error",
			};
		}
	},
	suggestions: async(newPar, popular, offset, limit) => {
		try {
			const isNew = newPar?.toLowerCase() === 'true';
			const isPopular = popular?.toLowerCase() === 'true';
			const finalOffset = offset ? +offset : 0;
			const finalLimit = limit ? +limit : 10;
			
			let result: Product[] | ProductErrorResponse
			if (isNew){
				result = await ProductRepository.getNew(finalOffset, finalLimit)
				console.log(result)
				if (Array.isArray(result)) {
					return {
						success: true,
						data: {
							products: result
						}
					};
				}
				return result;
			}
			if (isPopular){
				result = await ProductRepository.getPopular(finalOffset, finalLimit)
				console.log(result)
				if (Array.isArray(result)) {
					return {
						success: true,
						data: {
							products: result
						}
					};
				}
				return result;
			}
			return {
				success: false,
				message: 'Choose one of query parameters'
			}
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: "Server error",
			};
		}
	},
};
