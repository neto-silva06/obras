export class CreateMaterialUseCase {
    materialRepository;
    constructor(materialRepository) {
        this.materialRepository = materialRepository;
    }
    async execute(data) {
        return await this.materialRepository.create(data);
    }
}
export class ListMaterialsUseCase {
    materialRepository;
    constructor(materialRepository) {
        this.materialRepository = materialRepository;
    }
    async execute() {
        return await this.materialRepository.findAll();
    }
}
export class GetMaterialUseCase {
    materialRepository;
    constructor(materialRepository) {
        this.materialRepository = materialRepository;
    }
    async execute(id) {
        const material = await this.materialRepository.findById(id);
        if (!material)
            throw new Error("Material not found");
        return material;
    }
}
export class UpdateMaterialUseCase {
    materialRepository;
    constructor(materialRepository) {
        this.materialRepository = materialRepository;
    }
    async execute(id, data) {
        return await this.materialRepository.update(id, data);
    }
}
export class DeleteMaterialUseCase {
    materialRepository;
    constructor(materialRepository) {
        this.materialRepository = materialRepository;
    }
    async execute(id) {
        await this.materialRepository.delete(id);
    }
}
//# sourceMappingURL=MaterialUseCases.js.map