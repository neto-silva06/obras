import type { Request, Response } from "express";
import { PrismaStockRepository } from "../../infrastructure/repositories/PrismaStockRepository.js";
import { PrismaStockMovementRepository } from "../../infrastructure/repositories/PrismaStockMovementRepository.js";
import {
  GetStockByWarehouseUseCase,
  GetStockByMaterialUseCase,
  UpdateStockUseCase,
  AdjustStockUseCase
} from "../../application/use-cases/StockUseCases.js";

const stockRepository = new PrismaStockRepository();
const stockMovementRepository = new PrismaStockMovementRepository();

const getStockByWarehouse = new GetStockByWarehouseUseCase(stockRepository);
const getStockByMaterial = new GetStockByMaterialUseCase(stockRepository);
const updateStock = new UpdateStockUseCase(stockRepository);
const adjustStock = new AdjustStockUseCase(stockRepository, stockMovementRepository);

interface AuthRequest extends Request {
  user?: { id: string };
}

export class StockController {
  async getByWarehouse(req: Request, res: Response) {
    const { warehouseId } = req.params;
    return res.json(await getStockByWarehouse.execute(warehouseId as string));
  }

  async getByMaterial(req: Request, res: Response) {
    const { materialId } = req.params;
    return res.json(await getStockByMaterial.execute(materialId as string));
  }

  async update(req: Request, res: Response) {
    const { warehouseId, materialId } = req.params;
    const { quantity } = req.body;
    return res.json(await updateStock.execute(warehouseId as string, materialId as string, quantity));
  }

  async adjust(req: AuthRequest, res: Response) {
    const { warehouseId, materialId, quantity, operation, description } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    try {
      return res.json(await adjustStock.execute({
        warehouseId,
        materialId,
        quantity,
        operation,
        userId,
        description
      }));
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }
}
