import { Request, Response } from "express";
import { CategoryService } from "./categoryService";

export class CategoryController {
    const service = new CategoryService();

    async getAll(req: Request, res: Response) {
        const categories = await this.service.getAll();
        res.json(categories);
    }

    async getById(req: Request, res: Response) {
        const id = Number(req.params.id);

        try {
        const category = await this.sService.getById(id);
        res.json(category);
        } catch {
        res.status(404).json({ message: "Category not found" });
        }
    }

    async create(req: Request, res: Response) {
        const { title, img } = req.body;

        if (!title) {
        return res.status(400).json({ message: "Title is required" });
        }

        const category = await this.service.create(title, img);
        res.status(201).json(category);
    }

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const { title, img } = req.body;

        try {
        const updated = await this.service.update(id, title, img);
        res.json(updated);
        } catch {
        res.status(404).json({ message: "Category not found" });
        }
    }

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id);

        try {
        await this.service.delete(id);
        res.json({ message: "Category deleted" });
        } catch {
        res.status(404).json({ message: "Category not found" });
        }
    }
}


