import type { Work } from "../../domain/entities/Work.js";
import type { WorkRepository } from "../../domain/repositories/WorkRepository.js";
import { prisma } from "../database/prisma.js";
export class PrismaWorkRepository implements WorkRepository {
  async findAll(): Promise<Work[]> {
    const works = await prisma.work.findMany();
    return works.map(work => ({ ...work, description: work.description || '' }));
  }
  async findById(id: string): Promise<Work | null> {
    const work = await prisma.work.findUnique({ where: { id } });
    return work ? { ...work, description: work.description || '' } : null;
  }
  async create(data: Omit<Work, 'id'>): Promise<Work> { const created = await prisma.work.create({ data: data as any }); return { ...created, description: created.description || '' }; }
  async update(id: string, data: Partial<Work>): Promise<Work> { const updated = await prisma.work.update({ where: { id }, data: data as any }); return { ...updated, description: updated.description || '' }; }
  async delete(id: string): Promise<void> { await prisma.work.delete({ where: { id } }); }
}
