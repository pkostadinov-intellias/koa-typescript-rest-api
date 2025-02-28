import Router from "koa-router";
import {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController
} from "../controllers/users-controller";
import { authMiddleware } from "../middleware/auth-middleware";

const userRouter = new Router({ prefix: "/users" });

userRouter.get("/", authMiddleware, getAllUsersController);
userRouter.get("/:id", authMiddleware, getUserByIdController);
userRouter.post("/", authMiddleware, createUserController);
userRouter.patch("/:id", authMiddleware, updateUserController);
userRouter.delete("/:id", authMiddleware, deleteUserController);

export default userRouter;
