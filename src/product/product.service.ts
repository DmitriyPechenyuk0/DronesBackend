import { ProductRepository } from "./product.repository";
import { ProductErrorResponse, ProductGetAllSuccessResponse, ProductServiceContract, ProductWhereInput } from "./product.types";

export const ProductService: ProductServiceContract = {
    getAll: async (query) => {
        try {
            let { page, limit , skip, take, category_id, min_price, max_price, discount } = query
            
            const products = await ProductRepository.getAll(skip, take, category_id, min_price, max_price, discount)
            let response: ProductGetAllSuccessResponse = {
                success: true,
                data: {
                    products: products ?? []
                }
            }
            return response
        } catch (error) {
            let response: ProductErrorResponse = {
                success: false,
                message: "Server error"
            }
            return response
        }
    
        
    }
}