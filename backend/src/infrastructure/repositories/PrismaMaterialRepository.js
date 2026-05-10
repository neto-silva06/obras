import { prisma } from "../database/prisma.js";
export class PrismaMaterialRepository {
    async findAll() {
        return await prisma.material.findMany();
    }
    async findById(id) {
        return await prisma.material.findUnique({ where: { id } });
    }
    async create(data) {
        return await prisma.material.create({ data: data });
    }
    async update(id, data) {
        return await prisma.material.update({ where: { id }, data: data });
    }
    async delete(id) {
        await prisma.material.delete({ where: { id } });
    }
}
//# sourceMappingURL=PrismaMaterialRepository.js.map