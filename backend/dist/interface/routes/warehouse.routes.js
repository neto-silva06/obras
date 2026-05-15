import { Router } from "express";
import { WarehouseController } from "../controllers/WarehouseController.js";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware.js";
import { roleMiddleware } from "../../infrastructure/middlewares/role.middleware.js";
const warehouseRouter = Router();
const warehouseController = new WarehouseController();
warehouseRouter.use(authMiddleware);
warehouseRouter.get("/", warehouseController.list);
warehouseRouter.get("/:id", warehouseController.get);
warehouseRouter.post("/", roleMiddleware(['ADMIN']), warehouseController.create);
warehouseRouter.put("/:id", roleMiddleware(['ADMIN']), warehouseController.update);
warehouseRouter.delete("/:id", roleMiddleware(['ADMIN']), warehouseController.delete);
export { warehouseRouter };
//# sourceMappingURL=warehouse.routes.js.map