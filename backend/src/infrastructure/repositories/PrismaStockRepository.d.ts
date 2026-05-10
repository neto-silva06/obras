import type { Stock } from "../../domain/entities/Stock.js";
import type { StockRepository } from "../../domain/repositories/StockRepository.js";
export declare class PrismaStockRepository implements StockRepository {
    findByWarehouse(warehouseId: string): Promise<Stock[]>;
    findByMaterial(materialId: string): Promise<Stock[]>;
    findByWarehouseAndMaterial(warehouseId: string, materialId: string): Promise<Stock | null>;
    updateQuantity(warehouseId: string, materialId: string, quantity: number): Promise<Stock>;
    upsertStock(warehouseId: string, materialId: string, quantity: number): Promise<Stock>;
}
//# sourceMappingURL=PrismaStockRepository.d.ts.map