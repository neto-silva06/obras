import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
const authRouter = Router();
const authController = new AuthController();
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
export { authRouter };
//# sourceMappingURL=auth.routes.js.map