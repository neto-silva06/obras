import type { Stock } from "../../domain/entities/Stock.js";
import type { StockRepository } from "../../domain/repositories/StockRepository.js";
import { prisma } from "../database/prisma.js";

export class PrismaStockRepository implements StockRepository {
  async findByWarehouse(warehouseId: string): Promise<Stock[]> {
    return await prisma.stock.findMany({
      where: { warehouseId },
      include: { material: true }
    }) as any;
  }

  async findByMaterial(materialId: string): Promise<Stock[]> {
    return await prisma.stock.findMany({
      where: { materialId },
      include: { warehouse: true }
    }) as any;
  }

  async findByWarehouseAndMaterial(warehouseId: string, materialId: string): Promise<Stock | null> {
    return await prisma.stock.findUnique({
      where: {
        warehouseId_materialId: {
          warehouseId,
          materialId
        }
      }
    }) as any;
  }

  async updateQuantity(warehouseId: string, materialId: string, quantity: number): Promise<Stock> {
    return await prisma.stock.update({
      where: {
        warehouseId_materialId: {
          warehouseId,
          materialId
        }
      },
      data: { quantity },
    }) as any;
  }

  async upsertStock(warehouseId: string, materialId: string, quantity: number): Promise<Stock> {
    return await prisma.stock.upsert({
      where: {
        warehouseId_materialId: {
          warehouseId,
          materialId
        }
      },
      update: { quantity },
      create: {
        warehouseId,
        materialId,
        quantity
      }
    }) as any;
  }
}
