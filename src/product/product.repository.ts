import { PRISMA_CLIENT } from "../config/client";
import { ProductRepositoryContract } from "./product.types";


export const ProductRepository: ProductRepositoryContract = {
    getAll: async (skip, take, category_id, min_price, max_price, discount) => {
        try {
            return PRISMA_CLIENT.product.findMany({
                ...(skip !== undefined && { skip }),
                ...(take !== undefined && { take }),
                where: {
                    ...(category_id ? { categoryId: category_id } : {}),
                    
                    ...(min_price ? { price: { gte: min_price } } : {}),
                    ...(max_price ? { price: { lte: max_price } } : {}),
                    
                    ...(discount !== undefined 
                        ? { discount: discount ? { gt: 0 } : { equals: 0 } }
                        : {}
                    ),
                },
                include: {
                    category: true
                }
            })
        } catch (error) {
            return []
        }
    }
}