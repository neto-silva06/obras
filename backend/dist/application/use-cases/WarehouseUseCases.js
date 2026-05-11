export class CreateWarehouseUseCase {
    warehouseRepository;
    constructor(warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }
    async execute(data) {
        return await this.warehouseRepository.create(data);
    }
}
export class ListWarehousesUseCase {
    warehouseRepository;
    constructor(warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }
    async execute() {
        return await this.warehouseRepository.findAll();
    }
}
export class GetWarehouseUseCase {
    warehouseRepository;
    constructor(warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }
    async execute(id) {
        const warehouse = await this.warehouseRepository.findById(id);
        if (!warehouse)
            throw new Error("Warehouse not found");
        return warehouse;
    }
}
export class UpdateWarehouseUseCase {
    warehouseRepository;
    constructor(warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }
    async execute(id, data) {
        return await this.warehouseRepository.update(id, data);
    }
}
export class DeleteWarehouseUseCase {
    warehouseRepository;
    constructor(warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }
    async execute(id) {
        await this.warehouseRepository.delete(id);
    }
}
//# sourceMappingURL=WarehouseUseCases.js.map