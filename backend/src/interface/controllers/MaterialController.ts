import type { Request, Response } from "express";
import { PrismaMaterialRepository } from "../../infrastructure/repositories/PrismaMaterialRepository.js";
import {
  CreateMaterialUseCase,
  ListMaterialsUseCase,
  GetMaterialUseCase,
  UpdateMaterialUseCase,
  DeleteMaterialUseCase
} from "../../application/use-cases/MaterialUseCases.js";

const materialRepository = new PrismaMaterialRepository();
const createMaterial = new CreateMaterialUseCase(materialRepository);
const listMaterials = new ListMaterialsUseCase(materialRepository);
const getMaterial = new GetMaterialUseCase(materialRepository);
const updateMaterial = new UpdateMaterialUseCase(materialRepository);
const deleteMaterial = new DeleteMaterialUseCase(materialRepository);

export class MaterialController {
  async list(req: Request, res: Response) {
    return res.json(await listMaterials.execute());
  }

  async create(req: Request, res: Response) {
    return res.status(201).json(await createMaterial.execute(req.body));
  }

  async get(req: Request, res: Response) {
    try {
      return res.json(await getMaterial.execute(req.params.id as string));
    } catch (e: any) {
      return res.status(404).json({ message: e.message });
    }
  }

  async update(req: Request, res: Response) {
    return res.json(await updateMaterial.execute(req.params.id as string, req.body));
  }

  async delete(req: Request, res: Response) {
    await deleteMaterial.execute(req.params.id as string);
    return res.status(204).send();
  }
}
