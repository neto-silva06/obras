import { Router } from "express";
import { StockMovementController } from "../controllers/StockMovementController.js";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware.js";

const router = Router();
const controller = new StockMovementController();

router.use(authMiddleware);

router.get("/", controller.index);
router.get("/material/:materialId", controller.getByMaterial);

export { router as stockMovementRoutes };
