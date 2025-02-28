import Router from "koa-router";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController
} from "../controllers/task-controller";
import {
  createTaskValidationSchema,
  taskValidationSchema
} from "../schemas/task.validation-schema";
import { validatorMiddleware } from "../middleware/validator-middleware";

const taskRouter = new Router({ prefix: "/tasks" });

taskRouter.get("/", getAllTasksController);
taskRouter.get("/:id", getTaskByIdController);

taskRouter.post(
  "/",
  validatorMiddleware(createTaskValidationSchema),
  createTaskController
);

taskRouter.patch(
  "/:id",
  validatorMiddleware(taskValidationSchema),
  updateTaskController
);

taskRouter.delete("/:id", deleteTaskController);

export default taskRouter;
