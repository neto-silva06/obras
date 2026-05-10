import type { Request, Response } from "express";
import { PrismaStockRepository } from "../../infrastructure/repositories/PrismaStockRepository.js";
import {
  GetStockByWarehouseUseCase,
  GetStockByMaterialUseCase,
  UpdateStockUseCase,
  AdjustStockUseCase
} from "../../application/use-cases/StockUseCases.js";

const stockRepository = new PrismaStockRepository();
const getStockByWarehouse = new GetStockByWarehouseUseCase(stockRepository);
const getStockByMaterial = new GetStockByMaterialUseCase(stockRepository);
const updateStock = new UpdateStockUseCase(stockRepository);
const adjustStock = new AdjustStockUseCase(stockRepository);

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

  async adjust(req: Request, res: Response) {
    const { warehouseId, materialId } = req.body;
    const { quantity, operation } = req.body;
    try {
      return res.json(await adjustStock.execute(warehouseId, materialId, quantity, operation));
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }
}
