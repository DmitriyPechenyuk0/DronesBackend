import { Client } from "../prisma/client";

export class CategoryRepository {
    async getAll() {
        return prisma.category.findMany();
    }

    async getById(id: number) {
        return prisma.category.findUnique({ where: { id } });
    }

    async create(data: { title: string; img?: string }) {
        return prisma.category.create({ data });
    }

    async update(id: number, data: { title?: string; img?: string }) {
        return prisma.category.update({
        where: { id },
        data,
        });
    }

    async delete(id: number) {
        return prisma.category.delete({ where: { id } });
    }
}
