import type { StockRepository } from "../../domain/repositories/StockRepository.js";
import type { StockMovementRepository } from "../../domain/repositories/StockMovementRepository.js";
import type { Stock } from "../../domain/entities/Stock.js";

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
  constructor(
    private stockRepository: StockRepository,
    private stockMovementRepository: StockMovementRepository
  ) {}

  async execute(params: {
    warehouseId: string,
    materialId: string,
    quantity: number,
    operation: 'add' | 'remove' | 'set',
    userId: string,
    description?: string
  }) {
    const { warehouseId, materialId, quantity, operation, userId, description } = params;
    let newQuantity = 0;

    const currentStock = await this.stockRepository.findByWarehouseAndMaterial(warehouseId, materialId);
    const currentQty = currentStock?.quantity || 0;

    if (operation === 'add') {
      newQuantity = currentQty + quantity;
    } else if (operation === 'remove') {
      if (currentQty < quantity) throw new Error("Insufficient stock balance");
      newQuantity = currentQty - quantity;
    } else {
      newQuantity = quantity;
    }

    const updatedStock = await this.stockRepository.upsertStock(warehouseId, materialId, newQuantity);

    // Record the movement
    await this.stockMovementRepository.create({
      type: operation,
      quantity,
      description: description || null,
      materialId,
      warehouseId,
      userId
    });

    return updatedStock;
  }
}
