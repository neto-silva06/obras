import { Router } from "express";
import { MaterialController } from "../controllers/MaterialController.js";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware.js";
import { roleMiddleware } from "../../infrastructure/middlewares/role.middleware.js";
const materialRouter = Router();
const materialController = new MaterialController();
materialRouter.use(authMiddleware);
materialRouter.get("/", materialController.list);
materialRouter.get("/:id", materialController.get);
materialRouter.post("/", roleMiddleware(['ADMIN']), materialController.create);
materialRouter.put("/:id", roleMiddleware(['ADMIN']), materialController.update);
materialRouter.delete("/:id", roleMiddleware(['ADMIN']), materialController.delete);
export { materialRouter };
//# sourceMappingURL=material.routes.js.map