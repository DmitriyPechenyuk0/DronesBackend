import { Request, Response } from "express";
import { CategoryService } from "./categoryService";

const categoryService = new CategoryService();

export class CategoryController {
    async getAll(req: Request, res: Response) {
        const categories = await categoryService.getAll();
        res.json(categories);
    }

    async getById(req: Request, res: Response) {
        const id = Number(req.params.id);

        try {
        const category = await categoryService.getById(id);
        res.json(category);
        } catch {
        res.status(404).json({ message: "Category not found" });
        }
    }

    async create(req: Request, res: Response) {
        const { title, img } = req.body;
        const created = await categoryService.create(title, img);
        res.status(201).json(created);
    }

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const { title, img } = req.body;

        try {
        const updated = await categoryService.update(id, title, img);
        res.json(updated);
        } catch {
        res.status(404).json({ message: "Category not found" });
        }
    }

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id);

        try {
        await categoryService.delete(id);
        res.json({ message: "Category deleted" });
        } catch {
        res.status(404).json({ message: "Category not found" });
        }
    }
}

