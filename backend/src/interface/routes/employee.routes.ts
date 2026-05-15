import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController.js";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware.js";
import { roleMiddleware } from "../../infrastructure/middlewares/role.middleware.js";

const employeeRouter = Router();
const employeeController = new EmployeeController();

employeeRouter.use(authMiddleware);

employeeRouter.get("/", employeeController.list);
employeeRouter.get("/:id", employeeController.get);
employeeRouter.post("/", roleMiddleware(['ADMIN']), employeeController.create);
employeeRouter.put("/:id", roleMiddleware(['ADMIN']), employeeController.update);
employeeRouter.delete("/:id", roleMiddleware(['ADMIN']), employeeController.delete);

export { employeeRouter };
