import { prisma } from "../prisma/client";

export class CategoryRepository {
    getAll() {
        return prisma.category.findMany();
    }

    getById(id: number) {
        return prisma.category.findUnique({ where: { id } });
    }

    create(data: { title: string; img?: string }) {
        return prisma.category.create({ data });
    }

    update(id: number, data: { title?: string; img?: string }) {
        return prisma.category.update({
        where: { id },
        data,
        });
    }

    delete(id: number) {
        return prisma.category.delete({ where: { id } });
    }
}
