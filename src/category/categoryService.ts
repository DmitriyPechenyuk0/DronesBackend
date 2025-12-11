import { CategoryRepository } from "./categoryRepository";

const categoryRepository = new CategoryRepository();

export class CategoryService {
    async getAll() {
        return categoryRepository.getAll();
    }

    async getById(id: number) {
        const category = await categoryRepository.getById(id);
        if (!category) throw new Error("Category not found");
        return category;
    }

    async create(title: string, img?: string) {
        return categoryRepository.create({ title, img });
    }

    async update(id: number, title?: string, img?: string) {
        return categoryRepository.update(id, { title, img });
    }

    async delete(id: number) {
        return categoryRepository.delete(id);
    }
}
