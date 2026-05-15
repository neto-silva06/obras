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
    stockMovementRepository;
    constructor(stockRepository, stockMovementRepository) {
        this.stockRepository = stockRepository;
        this.stockMovementRepository = stockMovementRepository;
    }
    async execute(params) {
        const { warehouseId, materialId, quantity, operation, userId, description } = params;
        let newQuantity = 0;
        const currentStock = await this.stockRepository.findByWarehouseAndMaterial(warehouseId, materialId);
        const currentQty = currentStock?.quantity || 0;
        if (operation === 'add') {
            newQuantity = currentQty + quantity;
        }
        else if (operation === 'remove') {
            if (currentQty < quantity)
                throw new Error("Insufficient stock balance");
            newQuantity = currentQty - quantity;
        }
        else {
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
//# sourceMappingURL=StockUseCases.js.map