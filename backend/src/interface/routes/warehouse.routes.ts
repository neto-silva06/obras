import { Router } from "express";
import { WarehouseController } from "../controllers/WarehouseController.js";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware.js";

const warehouseRouter = Router();
const warehouseController = new WarehouseController();

warehouseRouter.use(authMiddleware);

warehouseRouter.get("/", warehouseController.list);
warehouseRouter.get("/:id", warehouseController.get);
warehouseRouter.post("/", warehouseController.create);
warehouseRouter.put("/:id", warehouseController.update);
warehouseRouter.delete("/:id", warehouseController.delete);

export { warehouseRouter };
