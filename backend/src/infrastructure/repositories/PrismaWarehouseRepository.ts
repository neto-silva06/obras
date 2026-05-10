import type { Warehouse } from "../../domain/entities/Warehouse.js";
import type { WarehouseRepository } from "../../domain/repositories/WarehouseRepository.js";
import { prisma } from "../database/prisma.js";

export class PrismaWarehouseRepository implements WarehouseRepository {
  async findAll(): Promise<Warehouse[]> {
    return await prisma.warehouse.findMany();
  }

  async findById(id: string): Promise<Warehouse | null> {
    return await prisma.warehouse.findUnique({ where: { id } });
  }

  async findByWorkId(workId: string): Promise<Warehouse[]> {
    return await prisma.warehouse.findMany({ where: { workId } });
  }

  async create(data: Omit<Warehouse, 'id'>): Promise<Warehouse> {
    return await prisma.warehouse.create({ data: data as any });
  }

  async update(id: string, data: Partial<Warehouse>): Promise<Warehouse> {
    return await prisma.warehouse.update({ where: { id }, data: data as any });
  }

  async delete(id: string): Promise<void> {
    await prisma.warehouse.delete({ where: { id } });
  }
}
