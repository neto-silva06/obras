import { Router } from "express";
import { WorkController } from "../controllers/WorkController.js";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware.js";
const workRouter = Router();
const workController = new WorkController();
workRouter.use(authMiddleware);
workRouter.get("/", workController.list);
workRouter.get("/:id", workController.get);
workRouter.post("/", workController.create);
workRouter.put("/:id", workController.update);
workRouter.delete("/:id", workController.delete);
export { workRouter };
//# sourceMappingURL=work.routes.js.map