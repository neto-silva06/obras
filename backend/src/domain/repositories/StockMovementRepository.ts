import type { StockMovement } from "../entities/StockMovement.js";

export interface StockMovementRepository {
  create(data: Omit<StockMovement, 'id' | 'createdAt'>): Promise<StockMovement>;
  listAll(): Promise<StockMovement[]>;
  findByMaterial(materialId: string): Promise<StockMovement[]>;
  findByWarehouse(warehouseId: string): Promise<StockMovement[]>;
}
