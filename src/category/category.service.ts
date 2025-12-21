import { CategoryRepository } from "./category.repository";

export class CategoryService {
    const repository = new CategoryRepository();

    getAll() {
        return this.repository.getAll();
    }

    async getById(id: number) {
        const category = await this.repository.getById(id);
        if (!category) throw new Error("Not found");
        return category;
    }

    create(title: string, img?: string) {
        return this.repository.create({ title, img });
    }

    update(id: number, title?: string, img?: string) {
        return this.repository.update(id, { title, img });
    }

    delete(id: number) {
        return this.repository.delete(id);
    }
}
