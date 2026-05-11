import { PrismaMaterialRepository } from "../../infrastructure/repositories/PrismaMaterialRepository.js";
import { CreateMaterialUseCase, ListMaterialsUseCase, GetMaterialUseCase, UpdateMaterialUseCase, DeleteMaterialUseCase } from "../../application/use-cases/MaterialUseCases.js";
const materialRepository = new PrismaMaterialRepository();
const createMaterial = new CreateMaterialUseCase(materialRepository);
const listMaterials = new ListMaterialsUseCase(materialRepository);
const getMaterial = new GetMaterialUseCase(materialRepository);
const updateMaterial = new UpdateMaterialUseCase(materialRepository);
const deleteMaterial = new DeleteMaterialUseCase(materialRepository);
export class MaterialController {
    async list(req, res) {
        return res.json(await listMaterials.execute());
    }
    async create(req, res) {
        return res.status(201).json(await createMaterial.execute(req.body));
    }
    async get(req, res) {
        try {
            return res.json(await getMaterial.execute(req.params.id));
        }
        catch (e) {
            return res.status(404).json({ message: e.message });
        }
    }
    async update(req, res) {
        return res.json(await updateMaterial.execute(req.params.id, req.body));
    }
    async delete(req, res) {
        await deleteMaterial.execute(req.params.id);
        return res.status(204).send();
    }
}
//# sourceMappingURL=MaterialController.js.map