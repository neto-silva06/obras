import type { Request, Response } from "express";
import { PrismaStockMovementRepository } from "../../infrastructure/repositories/PrismaStockMovementRepository.js";
import { ListStockMovements, GetMaterialHistory } from "../../application/use-cases/StockMovementUseCases.js";

const repository = new PrismaStockMovementRepository();
const listStockMovements = new ListStockMovements(repository);
const getMaterialHistory = new GetMaterialHistory(repository);

export class StockMovementController {
  async index(req: Request, res: Response) {
    return res.json(await listStockMovements.execute());
  }

  async getByMaterial(req: Request, res: Response) {
    const { materialId } = req.params;
    if (!materialId) return res.status(400).json({ message: "Material ID is required" });
    return res.json(await getMaterialHistory.execute(materialId));
  }
}
