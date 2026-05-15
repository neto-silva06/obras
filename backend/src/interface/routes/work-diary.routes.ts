import { Router } from "express";
import { WorkDiaryController } from "../controllers/WorkDiaryController.js";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware.js";

const workDiaryRouter = Router();
const workDiaryController = new WorkDiaryController();

workDiaryRouter.use(authMiddleware);

workDiaryRouter.get("/", workDiaryController.getDiary);
workDiaryRouter.post("/labor", workDiaryController.addLabor);
workDiaryRouter.delete("/labor/:id", workDiaryController.removeLabor);
workDiaryRouter.post("/material", workDiaryController.addMaterial);
workDiaryRouter.delete("/material/:id", workDiaryController.removeMaterial);
workDiaryRouter.get("/report", workDiaryController.getReport);

export { workDiaryRouter };
