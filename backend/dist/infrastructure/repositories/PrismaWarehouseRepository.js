import { prisma } from "../database/prisma.js";
export class PrismaWarehouseRepository {
    async findAll() {
        return await prisma.warehouse.findMany();
    }
    async findById(id) {
        return await prisma.warehouse.findUnique({ where: { id } });
    }
    async findByWorkId(workId) {
        return await prisma.warehouse.findMany({ where: { workId } });
    }
    async create(data) {
        return await prisma.warehouse.create({ data: data });
    }
    async update(id, data) {
        return await prisma.warehouse.update({ where: { id }, data: data });
    }
    async delete(id) {
        await prisma.warehouse.delete({ where: { id } });
    }
}
//# sourceMappingURL=PrismaWarehouseRepository.js.map