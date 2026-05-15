import { Router } from "express";
import { WorkController } from "../controllers/WorkController.js";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware.js";
import { roleMiddleware } from "../../infrastructure/middlewares/role.middleware.js";

const workRouter = Router();
const workController = new WorkController();

workRouter.use(authMiddleware);

workRouter.get("/", workController.list);
workRouter.get("/:id", workController.get);
workRouter.post("/", roleMiddleware(['ADMIN']), workController.create);
workRouter.put("/:id", roleMiddleware(['ADMIN']), workController.update);
workRouter.delete("/:id", roleMiddleware(['ADMIN']), workController.delete);

export { workRouter };
