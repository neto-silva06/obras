import { Router } from "express";
import { MaterialController } from "../controllers/MaterialController.js";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware.js";

const materialRouter = Router();
const materialController = new MaterialController();

materialRouter.use(authMiddleware);

materialRouter.get("/", materialController.list);
materialRouter.get("/:id", materialController.get);
materialRouter.post("/", materialController.create);
materialRouter.put("/:id", materialController.update);
materialRouter.delete("/:id", materialController.delete);

export { materialRouter };
