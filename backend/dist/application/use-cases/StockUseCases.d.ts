import type { StockRepository } from "../../domain/repositories/StockRepository.js";
import type { StockMovementRepository } from "../../domain/repositories/StockMovementRepository.js";
import type { Stock } from "../../domain/entities/Stock.js";
export declare class GetStockByWarehouseUseCase {
    private stockRepository;
    constructor(stockRepository: StockRepository);
    execute(warehouseId: string): Promise<Stock[]>;
}
export declare class GetStockByMaterialUseCase {
    private stockRepository;
    constructor(stockRepository: StockRepository);
    execute(materialId: string): Promise<Stock[]>;
}
export declare class UpdateStockUseCase {
    private stockRepository;
    constructor(stockRepository: StockRepository);
    execute(warehouseId: string, materialId: string, quantity: number): Promise<Stock>;
}
export declare class AdjustStockUseCase {
    private stockRepository;
    private stockMovementRepository;
    constructor(stockRepository: StockRepository, stockMovementRepository: StockMovementRepository);
    execute(params: {
        warehouseId: string;
        materialId: string;
        quantity: number;
        operation: 'add' | 'remove' | 'set';
        userId: string;
        description?: string;
    }): Promise<Stock>;
}
//# sourceMappingURL=StockUseCases.d.ts.map