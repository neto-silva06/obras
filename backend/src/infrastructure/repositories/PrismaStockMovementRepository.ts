import type { StockMovement } from "../../domain/entities/StockMovement.js";
import type { StockMovementRepository } from "../../domain/repositories/StockMovementRepository.js";
import { prisma } from "../database/prisma.js";

export class PrismaStockMovementRepository implements StockMovementRepository {
  async create(data: Omit<StockMovement, 'id' | 'createdAt'>): Promise<StockMovement> {
    const movement = await prisma.stockMovement.create({
      data: {
        type: data.type,
        quantity: data.quantity,
        description: data.description ?? null,
        materialId: data.materialId,
        warehouseId: data.warehouseId,
        userId: data.userId
      }
    });
    return movement as unknown as StockMovement;
  }

  async listAll(): Promise<StockMovement[]> {
    const movements = await prisma.stockMovement.findMany({
      include: {
        material: true,
        warehouse: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return movements as unknown as StockMovement[];
  }

  async findByMaterial(materialId: string): Promise<StockMovement[]> {
    const movements = await prisma.stockMovement.findMany({
      where: { materialId },
      include: {
        warehouse: true,
        user: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return movements as unknown as StockMovement[];
  }

  async findByWarehouse(warehouseId: string): Promise<StockMovement[]> {
    const movements = await prisma.stockMovement.findMany({
      where: { warehouseId },
      include: {
        material: true,
        user: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return movements as unknown as StockMovement[];
  }
}
