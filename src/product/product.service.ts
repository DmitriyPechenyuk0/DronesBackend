import { PrismaClient, Product, Block, TechDetail } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { 
    ICreateProductDTO, 
    IUpdateProductDTO, 
    IPartialUpdateProductDTO 
} from './interfaces/product.interface';

const prisma = new PrismaClient();

type ProductDetailsWithRelations = Product & {
    category: { id: number; name: string } | null;
    blocks: Array<Block & { details: TechDetail[] }>;
};

export async function getAllProducts() {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            discount: true,
            image: true, 
            category: {
                select: {
                    id: true,
                    title: true,
                }
            }
        },
    });

    return products.map(p => ({
        ...p,
        category: p.category ? { id: p.category.id, name: p.category.title } : null,
    }));
}

export async function getProductById(id: number): Promise<ProductDetailsWithRelations | null> {
    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            category: {
                select: {
                    id: true,
                    title: true,
                }
            },
            blocks: {
                include: {
                    techDetails: true,
                }
            },
        },
    });

    if (!product) return null;

    return {
        ...product,
        category: product.category ? { id: product.category.id, name: product.category.title } : null,
        blocks: product.blocks.map(block => ({
            ...block,
            details: block.techDetails,
            // @ts-ignore
            techDetails: undefined, 
        })),
    } as unknown as ProductDetailsWithRelations;
}

export async function createProduct(data: ICreateProductDTO) {
    
    try {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                discount: data.discount,
                image: "default_image_placeholder", 
                amount: 1, 
                category: {
                    connect: { id: data.category_id }
                },
                
            },
            include: {
                category: { select: { id: true, title: true } },
                blocks: { include: { techDetails: true } }
            }
        });
        
        return product;

    } catch (e) {
        console.error(e);
        throw new Error("Validation error or failed to create product.");
    }
}

export async function updateProduct(id: number, data: IUpdateProductDTO) {

    const product = await prisma.product.update({
        where: { id },
        data: {
            name: data.name,
            price: data.price,
            discount: data.discount,
            categoryId: data.category_id, 
        },
        include: {
            category: { select: { id: true, title: true } },
            blocks: { include: { techDetails: true } }
        }
    });

    return product; 
}


export async function partialUpdateProduct(id: number, data: IPartialUpdateProductDTO) {
    
    const updateData: any = {
        name: data.name,
        price: data.price,
        discount: data.discount,
    };

    if (data.category_id !== undefined) {
        updateData.categoryId = data.category_id;
    }
    
    const cleanUpdateData = Object.fromEntries(
        Object.entries(updateData).filter(([, value]) => value !== undefined)
    );

    const product = await prisma.product.update({
        where: { id },
        data: cleanUpdateData,
        include: {
            category: { select: { id: true, title: true } },
            blocks: { include: { techDetails: true } }
        }
    });

    return product;
}

export async function deleteProduct(id: number) {

    const product = await prisma.product.delete({
        where: { id },
    });
    
    return null;
}