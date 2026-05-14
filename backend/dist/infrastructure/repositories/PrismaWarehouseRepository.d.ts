import type { Warehouse } from "../../domain/entities/Warehouse.js";
import type { WarehouseRepository } from "../../domain/repositories/WarehouseRepository.js";
export declare class PrismaWarehouseRepository implements WarehouseRepository {
    findAll(): Promise<Warehouse[]>;
    findById(id: string): Promise<Warehouse | null>;
    findByWorkId(workId: string): Promise<Warehouse[]>;
    create(data: Omit<Warehouse, 'id'>): Promise<Warehouse>;
    update(id: string, data: Partial<Warehouse>): Promise<Warehouse>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PrismaWarehouseRepository.d.ts.map