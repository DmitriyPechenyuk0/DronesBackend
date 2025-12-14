import { Request, Response } from "express";
import { Prisma } from "../generated/prisma";

export type Product = Prisma.ProductGetPayload<{
	include: {
		category: true;
	};
}>;
export type ProductDetail = Prisma.ProductGetPayload<{
	include: {
		category: true;
		blocks: {
			include: {
				techDetails: true;
			};
		};
	};
}>;

export interface ProductGetAllSuccessResponse {
	success: true;
	data: {
		products: Product[];
	};
}
export interface ProductGetByIdSuccessResponse {
	success: boolean;
	data: {
		products: ProductDetail;
	};
}

export interface ProductErrorResponse {
	success: false;
	message: string;
}
export interface ProductDeleteSuccessResponse {
	success: true;
	data: null;
}
export interface ProductCreateBody {
	name: string;
	price: number;
	description: string;
	discount: number;
	category_id: number;
	blocks: {
		header: string;
		description: string;
		image: string;
		details: {
			characteristic: string;
			description: string;
		}[];
	}[];
}

export interface ProductPartialUpdateBody {
	name?: string;
	price?: number;
	description?: string;
	discount?: number;
	category_id?: number;
	blocks?: {
		header?: string;
		description?: string;
		image?: string;
		details?: {
			characteristic?: string;
			description?: string;
		}[];
	}[];
}
export interface ProductDeleteBody {
	id: number;
}

export type ProductFullUpdateBody = ProductCreateBody;

export type ProductGetAllResponse = ProductErrorResponse | ProductGetAllSuccessResponse;
export type ProductGetByIdResponse =
	| ProductErrorResponse
	| ProductGetByIdSuccessResponse;
export type ProductCreateResponse =
	| ProductErrorResponse
	| ProductGetByIdSuccessResponse;
export type ProductFullUpdateResponse =
	| ProductErrorResponse
	| ProductGetByIdSuccessResponse;
export type ProductPartialUpdateResponse =
	| ProductErrorResponse
	| ProductGetByIdSuccessResponse;
export type ProductDeleteResponse =
	| ProductErrorResponse
	| ProductDeleteSuccessResponse;

export interface ProductGetAllQuery {
	page?: string;
	limit?: string;
	skip?: string;
	take?: string;
	category_id?: string;
	min_price?: string;
	max_price?: string;
	discount?: string;
}

export interface ProductGetAllQueryParsed {
    page: number;
    limit: number;
    skip?: number | undefined ;
    take?: number | undefined ;
    category_id?: number | undefined ;
    min_price?: number | undefined ;
    max_price?: number | undefined ;
    discount: boolean;
}

export interface ProductControllerContract {
	getAll: (
		req: Request<object, ProductGetAllResponse, object, ProductGetAllQuery>,
		res: Response<ProductGetAllResponse>,
	) => Promise<void>;
	// getById: (
	// 	req: Request<{ id: string }, ProductGetByIdResponse>,
	// 	res: Response<ProductGetByIdResponse>,
	// ) => Promise<void>;
	// create: (
	// 	req: Request<object, ProductCreateResponse, ProductCreateBody>,
	// 	res: Response<ProductCreateResponse>,
	// ) => Promise<void>;
	// fullUpdate: (
	// 	req: Request<{ id: string }, ProductFullUpdateBody, ProductCreateBody>,
	// 	res: Response<ProductFullUpdateBody>,
	// ) => Promise<void>;
	// partialUpdate: (
	// 	req: Request<
	// 		{ id: string },
	// 		ProductPartialUpdateResponse,
	// 		ProductPartialUpdateBody
	// 	>,
	// 	res: Response<ProductPartialUpdateResponse>,
	// ) => Promise<void>;
	// delete: (
	// 	req: Request<object, ProductDeleteResponse, ProductDeleteBody>,
	// 	res: Response<ProductDeleteResponse>,
	// ) => Promise<void>;
}

export interface ProductServiceContract {
    getAll: (query: ProductGetAllQueryParsed) =>  Promise<ProductGetAllResponse>;
    // create: () => Promise<>;
    // getByID: (id: number) => Promise<>;
    // fullUpdate: (id: number) => Promise<>;
    // partialUpdate: (id: number) => Promise<>
    // delete: (id: number) => Promise<>
}

export interface ProductRepositoryContract {
    getAll: (skip?: number, take?: number, category_id?: number, min_price?: number, max_price?: number, discount?: boolean) => Promise<Product[]>

}

export type ProductWhereInput = Prisma.ProductWhereInput