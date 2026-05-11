import type { Material } from "../../domain/entities/Material.js";
import type { MaterialRepository } from "../../domain/repositories/MaterialRepository.js";
export declare class CreateMaterialUseCase {
    private materialRepository;
    constructor(materialRepository: MaterialRepository);
    execute(data: Omit<Material, 'id'>): Promise<Material>;
}
export declare class ListMaterialsUseCase {
    private materialRepository;
    constructor(materialRepository: MaterialRepository);
    execute(): Promise<Material[]>;
}
export declare class GetMaterialUseCase {
    private materialRepository;
    constructor(materialRepository: MaterialRepository);
    execute(id: string): Promise<Material>;
}
export declare class UpdateMaterialUseCase {
    private materialRepository;
    constructor(materialRepository: MaterialRepository);
    execute(id: string, data: Partial<Material>): Promise<Material>;
}
export declare class DeleteMaterialUseCase {
    private materialRepository;
    constructor(materialRepository: MaterialRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=MaterialUseCases.d.ts.map