// src/product/interfaces/product.interface.ts

import { ITechDetail } from './techDetail.interface';

export interface IProductCategory {
    id: number;
    name: string;
}

export interface IProductBlock {
    id: number;
    header: string;
    description: string;
    image?: string;
    details: ITechDetail[];
}

export interface ICreateProductDTO {
    name: string;
    price: number;
    description: string;
    discount?: number;
    category_id: number; 
    
    blocks: Array<{
        header: string;
        description: string;
        image?: string;
        details: Array<{
            characteristic: string;
            description: string;
        }>;
    }>;
}

export type IUpdateProductDTO = ICreateProductDTO;
export type IPartialUpdateProductDTO = Partial<ICreateProductDTO>;

export interface IProductListItemResponse {
    id: number;
    name: string;
    price: number;
    image: string;
    discount?: number;
    category: IProductCategory;
}

export interface IProductDetailsResponse {
    id: number;
    name: string;
    price: number;
    image: string;
    discount?: number;
    category: IProductCategory;
    blocks: IProductBlock[];
}

export interface IApiResponse<T> {
    success: boolean;
    data: T;
}