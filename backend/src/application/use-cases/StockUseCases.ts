import { StockRepository } from "../../domain/repositories/StockRepository";
import { Stock } from "../../domain/entities/Stock";

export class GetStockByWarehouseUseCase {
  constructor(private stockRepository: StockRepository) {}
  async execute(warehouseId: string) {
    return await this.stockRepository.findByWarehouse(warehouseId);
  }
}

export class GetStockByMaterialUseCase {
  constructor(private stockRepository: StockRepository) {}
  async execute(materialId: string) {
    return await this.stockRepository.findByMaterial(materialId);
  }
}

export class UpdateStockUseCase {
  constructor(private stockRepository: StockRepository) {}
  async execute(warehouseId: string, materialId: string, quantity: number) {
    return await this.stockRepository.updateQuantity(warehouseId, materialId, quantity);
  }
}

export class AdjustStockUseCase {
  constructor(private stockRepository: StockRepository) {}
  async execute(warehouseId: string, materialId: string, quantity: number, operation: 'add' | 'remove' | 'set') {
    if (operation === 'add') {
      const stock = await this.stockRepository.findByWarehouseAndMaterial(warehouseId, materialId);
      const currentQty = stock?.quantity || 0;
      return await this.stockRepository.upsertStock(warehouseId, materialId, currentQty + quantity);
    } else if (operation === 'remove') {
      const stock = await this.stockRepository.findByWarehouseAndMaterial(warehouseId, materialId);
      const currentQty = stock?.quantity || 0;
      if (currentQty < quantity) throw new Error("Insufficient stock balance");
      return await this.stockRepository.upsertStock(warehouseId, materialId, currentQty - quantity);
    } else {
      return await this.stockRepository.upsertStock(warehouseId, materialId, quantity);
    }
  }
}
