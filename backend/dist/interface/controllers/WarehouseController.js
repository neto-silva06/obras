import { PrismaWarehouseRepository } from "../../infrastructure/repositories/PrismaWarehouseRepository.js";
import { CreateWarehouseUseCase, ListWarehousesUseCase, GetWarehouseUseCase, UpdateWarehouseUseCase, DeleteWarehouseUseCase } from "../../application/use-cases/WarehouseUseCases.js";
const warehouseRepository = new PrismaWarehouseRepository();
const createWarehouse = new CreateWarehouseUseCase(warehouseRepository);
const listWarehouses = new ListWarehousesUseCase(warehouseRepository);
const getWarehouse = new GetWarehouseUseCase(warehouseRepository);
const updateWarehouse = new UpdateWarehouseUseCase(warehouseRepository);
const deleteWarehouse = new DeleteWarehouseUseCase(warehouseRepository);
export class WarehouseController {
    async list(req, res) {
        return res.json(await listWarehouses.execute());
    }
    async create(req, res) {
        return res.status(201).json(await createWarehouse.execute(req.body));
    }
    async get(req, res) {
        try {
            return res.json(await getWarehouse.execute(req.params.id));
        }
        catch (e) {
            return res.status(404).json({ message: e.message });
        }
    }
    async update(req, res) {
        return res.json(await updateWarehouse.execute(req.params.id, req.body));
    }
    async delete(req, res) {
        await deleteWarehouse.execute(req.params.id);
        return res.status(204).send();
    }
}
//# sourceMappingURL=WarehouseController.js.map