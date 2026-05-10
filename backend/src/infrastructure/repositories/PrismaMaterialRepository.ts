import type { Material } from "../../domain/entities/Material.js";
import type { MaterialRepository } from "../../domain/repositories/MaterialRepository.js";
import { prisma } from "../database/prisma.js";

export class PrismaMaterialRepository implements MaterialRepository {
  async findAll(): Promise<Material[]> {
    return await prisma.material.findMany() as Material[];
  }

  async findById(id: string): Promise<Material | null> {
    return await prisma.material.findUnique({ where: { id } }) as Material | null;
  }

  async create(data: Omit<Material, 'id'>): Promise<Material> {
    return await prisma.material.create({ data: data as any } as any) as Material;
  }

  async update(id: string, data: Partial<Material>): Promise<Material> {
    return await prisma.material.update({ where: { id }, data: data as any }) as Material;
  }

  async delete(id: string): Promise<void> {
    await prisma.material.delete({ where: { id } });
  }
}
