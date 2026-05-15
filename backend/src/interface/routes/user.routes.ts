import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware.js";
import { roleMiddleware } from "../../infrastructure/middlewares/role.middleware.js";

const router = Router();
const userController = new UserController();

router.use(authMiddleware);
router.use(roleMiddleware(['ADMIN']));

router.get("/", userController.index);
router.post("/", userController.store);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export { router as userRoutes };
