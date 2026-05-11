import { prisma } from "../database/prisma.js";
export class PrismaWorkRepository {
    async findAll() {
        const works = await prisma.work.findMany();
        return works.map(work => ({ ...work, description: work.description || '' }));
    }
    async findById(id) {
        const work = await prisma.work.findUnique({ where: { id } });
        return work ? { ...work, description: work.description || '' } : null;
    }
    async create(data) { const created = await prisma.work.create({ data: data }); return { ...created, description: created.description || '' }; }
    async update(id, data) { const updated = await prisma.work.update({ where: { id }, data: data }); return { ...updated, description: updated.description || '' }; }
    async delete(id) { await prisma.work.delete({ where: { id } }); }
}
//# sourceMappingURL=PrismaWorkRepository.js.map