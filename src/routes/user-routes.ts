import Router from "koa-router";
import {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController
} from "../controllers/users-controller";
import { validatorMiddleware } from "../middleware/validator-middleware";
import {
  createUserValidationSchema,
  userValidationSchema
} from "../schemas/users.validation-schema";

const userRouter = new Router({ prefix: "/users" });

userRouter.get("/", getAllUsersController);
userRouter.get("/:id", getUserByIdController);

userRouter.post(
  "/",
  validatorMiddleware(createUserValidationSchema),
  createUserController
);
userRouter.patch(
  "/:id",
  validatorMiddleware(userValidationSchema),
  updateUserController
);

userRouter.delete("/:id", deleteUserController);

export default userRouter;
