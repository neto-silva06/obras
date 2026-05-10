import { Router } from "express";
import { StockController } from "../controllers/StockController.js";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware.js";

const stockRouter = Router();
const stockController = new StockController();

stockRouter.use(authMiddleware);

stockRouter.get("/warehouse/:warehouseId", stockController.getByWarehouse);
stockRouter.get("/material/:materialId", stockController.getByMaterial);
stockRouter.put("/:warehouseId/:materialId", stockController.update);
stockRouter.post("/adjust", stockController.adjust);

export { stockRouter };
