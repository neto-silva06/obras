import type { Warehouse } from "../../domain/entities/Warehouse.js";
import type { WarehouseRepository } from "../../domain/repositories/WarehouseRepository.js";
export declare class CreateWarehouseUseCase {
    private warehouseRepository;
    constructor(warehouseRepository: WarehouseRepository);
    execute(data: Omit<Warehouse, 'id'>): Promise<Warehouse>;
}
export declare class ListWarehousesUseCase {
    private warehouseRepository;
    constructor(warehouseRepository: WarehouseRepository);
    execute(): Promise<Warehouse[]>;
}
export declare class GetWarehouseUseCase {
    private warehouseRepository;
    constructor(warehouseRepository: WarehouseRepository);
    execute(id: string): Promise<Warehouse>;
}
export declare class UpdateWarehouseUseCase {
    private warehouseRepository;
    constructor(warehouseRepository: WarehouseRepository);
    execute(id: string, data: Partial<Warehouse>): Promise<Warehouse>;
}
export declare class DeleteWarehouseUseCase {
    private warehouseRepository;
    constructor(warehouseRepository: WarehouseRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=WarehouseUseCases.d.ts.map