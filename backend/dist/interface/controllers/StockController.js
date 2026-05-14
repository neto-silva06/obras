import { PrismaStockRepository } from "../../infrastructure/repositories/PrismaStockRepository.js";
import { GetStockByWarehouseUseCase, GetStockByMaterialUseCase, UpdateStockUseCase, AdjustStockUseCase } from "../../application/use-cases/StockUseCases.js";
const stockRepository = new PrismaStockRepository();
const getStockByWarehouse = new GetStockByWarehouseUseCase(stockRepository);
const getStockByMaterial = new GetStockByMaterialUseCase(stockRepository);
const updateStock = new UpdateStockUseCase(stockRepository);
const adjustStock = new AdjustStockUseCase(stockRepository);
export class StockController {
    async getByWarehouse(req, res) {
        const { warehouseId } = req.params;
        return res.json(await getStockByWarehouse.execute(warehouseId));
    }
    async getByMaterial(req, res) {
        const { materialId } = req.params;
        return res.json(await getStockByMaterial.execute(materialId));
    }
    async update(req, res) {
        const { warehouseId, materialId } = req.params;
        const { quantity } = req.body;
        return res.json(await updateStock.execute(warehouseId, materialId, quantity));
    }
    async adjust(req, res) {
        const { warehouseId, materialId } = req.body;
        const { quantity, operation } = req.body;
        try {
            return res.json(await adjustStock.execute(warehouseId, materialId, quantity, operation));
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
}
//# sourceMappingURL=StockController.js.map