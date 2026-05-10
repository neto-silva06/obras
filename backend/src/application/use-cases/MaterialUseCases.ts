import type { Material } from "../../domain/entities/Material.js";
import type { MaterialRepository } from "../../domain/repositories/MaterialRepository.js";

export class CreateMaterialUseCase {
  constructor(private materialRepository: MaterialRepository) {}
  async execute(data: Omit<Material, 'id'>) {
    return await this.materialRepository.create(data);
  }
}

export class ListMaterialsUseCase {
  constructor(private materialRepository: MaterialRepository) {}
  async execute() {
    return await this.materialRepository.findAll();
  }
}

export class GetMaterialUseCase {
  constructor(private materialRepository: MaterialRepository) {}
  async execute(id: string) {
    const material = await this.materialRepository.findById(id);
    if (!material) throw new Error("Material not found");
    return material;
  }
}

export class UpdateMaterialUseCase {
  constructor(private materialRepository: MaterialRepository) {}
  async execute(id: string, data: Partial<Material>) {
    return await this.materialRepository.update(id, data);
  }
}

export class DeleteMaterialUseCase {
  constructor(private materialRepository: MaterialRepository) {}
  async execute(id: string) {
    await this.materialRepository.delete(id);
  }
}
