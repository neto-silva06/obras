import { Material } from "../../domain/entities/Material";
import { MaterialRepository } from "../../domain/repositories/MaterialRepository";
import { prisma } from "../database/prisma";

export class PrismaMaterialRepository implements MaterialRepository {
  async findAll(): Promise<Material[]> {
    return await prisma.material.findMany();
  }

  async findById(id: string): Promise<Material | null> {
    return await prisma.material.findUnique({ where: { id } });
  }

  async create(data: Omit<Material, 'id'>): Promise<Material> {
    return await prisma.material.create({ data: data as any });
  }

  async update(id: string, data: Partial<Material>): Promise<Material> {
    return await prisma.material.update({ where: { id }, data: data as any });
  }

  async delete(id: string): Promise<void> {
    await prisma.material.delete({ where: { id } });
  }
}
