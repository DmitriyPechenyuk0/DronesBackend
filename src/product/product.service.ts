import { privateDecrypt } from "crypto";
import { ProductRepository } from "./product.repository";
import {
	ProductErrorResponse,
	ProductGetAllSuccessResponse,
	ProductGetByIdResponse,
	ProductGetByIdSuccessResponse,
	ProductServiceContract,
	ProductWhereInput,
	Product,
} from "./product.types";
import { DuplicateError } from "./errors";

export function generateTrigrams(text: string): string[] {
	const normalized = text.toLowerCase().trim().replace(/\s+/g, ' ');
	const padded = `  ${normalized} `;
	const trigrams: string[] = [];

	for (let i = 0; i < padded.length - 2; i++) {
		trigrams.push(padded.slice(i, i + 3));
	}

	return trigrams;
}

export function prepareTrigramsForDB(text: string): string {
	return generateTrigrams(text).join(',');
}

export function calculateSimilarity(trigrams1: string[], trigrams2: string[]): number {
  const set1 = new Set(trigrams1);
  const set2 = new Set(trigrams2);
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return union.size === 0 ? 0 : intersection.size / union.size;
}

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
	suggestions: async (params) => {
		try {
			let { limit, offset, popular, new: isNew, sameAs } = params

			limit = limit ?? 10;
      		offset = offset ?? 0;	
			
			if (popular && isNew) {
				return {
					success: false,
					message: "Parameters 'popular' and 'new' cannot be used together",
				};
			}
			let result: Product[] | ProductErrorResponse;

			if (sameAs) {
				result = await ProductRepository.getSimilar(+sameAs, offset, limit);
			}
			else if (popular) {
				result = await ProductRepository.getPopular(offset, limit);
			}
			else if (isNew) {
				result = await ProductRepository.getNew(offset, limit);
			}
			else {
				result = await ProductRepository.getAll(offset, limit);
			}
			return {
				success: true,
				data: {products: result}
			};
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: "Server error",
			};
		}
	},
};
