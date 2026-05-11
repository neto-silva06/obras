export class GetStockByWarehouseUseCase {
    stockRepository;
    constructor(stockRepository) {
        this.stockRepository = stockRepository;
    }
    async execute(warehouseId) {
        return await this.stockRepository.findByWarehouse(warehouseId);
    }
}
export class GetStockByMaterialUseCase {
    stockRepository;
    constructor(stockRepository) {
        this.stockRepository = stockRepository;
    }
    async execute(materialId) {
        return await this.stockRepository.findByMaterial(materialId);
    }
}
export class UpdateStockUseCase {
    stockRepository;
    constructor(stockRepository) {
        this.stockRepository = stockRepository;
    }
    async execute(warehouseId, materialId, quantity) {
        return await this.stockRepository.updateQuantity(warehouseId, materialId, quantity);
    }
}
export class AdjustStockUseCase {
    stockRepository;
    constructor(stockRepository) {
        this.stockRepository = stockRepository;
    }
    async execute(warehouseId, materialId, quantity, operation) {
        if (operation === 'add') {
            const stock = await this.stockRepository.findByWarehouseAndMaterial(warehouseId, materialId);
            const currentQty = stock?.quantity || 0;
            return await this.stockRepository.upsertStock(warehouseId, materialId, currentQty + quantity);
        }
        else if (operation === 'remove') {
            const stock = await this.stockRepository.findByWarehouseAndMaterial(warehouseId, materialId);
            const currentQty = stock?.quantity || 0;
            if (currentQty < quantity)
                throw new Error("Insufficient stock balance");
            return await this.stockRepository.upsertStock(warehouseId, materialId, currentQty - quantity);
        }
        else {
            return await this.stockRepository.upsertStock(warehouseId, materialId, quantity);
        }
    }
}
//# sourceMappingURL=StockUseCases.js.map