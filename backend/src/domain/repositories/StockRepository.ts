import { Stock } from "../domain/entities/Stock";
export interface StockRepository {
  findByWarehouse(warehouseId: string): Promise<Stock[]>;
  findByMaterial(materialId: string): Promise<Stock[]>;
  findByWarehouseAndMaterial(warehouseId: string, materialId: string): Promise<Stock | null>;
  updateQuantity(warehouseId: string, materialId: string, quantity: number): Promise<Stock>;
  upsertStock(warehouseId: string, materialId: string, quantity: number): Promise<Stock>;
}
