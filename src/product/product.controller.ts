import { Request, Response } from 'express';
import * as productService from './product.service';
import { Prisma } from '@prisma/client';

export async function handleGetProducts(req: Request, res: Response) {
    try {
        const products = await productService.getAllProducts();
        
        res.status(200).json({
            success: true,
            data: { products }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export async function handleGetProductById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }

    try {
        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export async function handleCreateProduct(req: Request, res: Response) {
    const productData = req.body; 

    try {
        const newProduct = await productService.createProduct(productData);
        
        res.status(201).json({
            success: true,
            data: newProduct
        });

    } catch (error) {
        if (error instanceof Error && error.message.includes('Validation')) {
             return res.status(400).json({ success: false, message: error.message });
        }
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export async function handleUpdateProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const productData = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }

    try {
        const updatedProduct = await productService.updateProduct(id, productData);
        
        res.status(200).json({
            success: true,
            data: updatedProduct
        });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export async function handlePartialUpdateProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const productData = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }

    try {
        const updatedProduct = await productService.partialUpdateProduct(id, productData);
        
        res.status(200).json({
            success: true,
            data: updatedProduct
        });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export async function handleDeleteProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }

    try {
        await productService.deleteProduct(id);
        
        res.status(200).json({
            success: true,
            data: null
        });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return res.status(404).json({ success: false, message: "Product not found" });
            }
            if (error.code === 'P2003') {
                 return res.status(400).json({ success: false, message: "Cannot delete product used in existing orders." });
            }
        }
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}