import type { StockMovementRepository } from "../../domain/repositories/StockMovementRepository.js";
import type { StockMovement } from "../../domain/entities/StockMovement.js";

export class ListStockMovements {
  constructor(private repository: StockMovementRepository) {}
  async execute(): Promise<StockMovement[]> {
    return await this.repository.listAll();
  }
}

export class GetMaterialHistory {
  constructor(private repository: StockMovementRepository) {}
  async execute(materialId: string): Promise<StockMovement[]> {
    return await this.repository.findByMaterial(materialId);
  }
}
