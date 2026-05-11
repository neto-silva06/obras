import type { Material } from "../../domain/entities/Material.js";
import type { MaterialRepository } from "../../domain/repositories/MaterialRepository.js";
export declare class PrismaMaterialRepository implements MaterialRepository {
    findAll(): Promise<Material[]>;
    findById(id: string): Promise<Material | null>;
    create(data: Omit<Material, 'id'>): Promise<Material>;
    update(id: string, data: Partial<Material>): Promise<Material>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PrismaMaterialRepository.d.ts.map