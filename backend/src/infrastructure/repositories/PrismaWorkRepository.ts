import { Work } from "../../domain/entities/Work";
import { WorkRepository } from "../../domain/repositories/WorkRepository";
import { prisma } from "../database/prisma";
export class PrismaWorkRepository implements WorkRepository {
  async findAll(): Promise<Work[]> { return await prisma.work.findMany(); }
  async findById(id: string): Promise<Work | null> { return await prisma.work.findUnique({ where: { id } }); }
  async create(data: Omit<Work, 'id'>): Promise<Work> { return await prisma.work.create({ data: data as any }); }
  async update(id: string, data: Partial<Work>): Promise<Work> { return await prisma.work.update({ where: { id }, data: data as any }); }
  async delete(id: string): Promise<void> { await prisma.work.delete({ where: { id } }); }
}
