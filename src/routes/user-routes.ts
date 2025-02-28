import Router from "koa-router";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  User
} from "../services/user-service";
import { authMiddleware } from "../middleware/auth-middleware";

const userRouter = new Router({ prefix: "/users" });

userRouter.get("/", authMiddleware, async (ctx) => {
  try {
    const users = await getAllUsers();
    ctx.body = { users };
  } catch (error: any) {
    ctx.throw(error.status, error.message);
  }
});

userRouter.get("/:id", authMiddleware, async (ctx) => {
  try {
    const userId = ctx.params.id;
    if (!userId) ctx.throw(400, "User ID is required");

    const user = await getUserById(userId);
    if (!user) ctx.throw(404, "User not found");

    ctx.body = { user };
  } catch (error: any) {
    ctx.throw(error.status, error.message);
  }
});

userRouter.post("/", authMiddleware, async (ctx) => {
  try {
    const { name, email } = ctx.request.body as User;

    if (!name || !email) ctx.throw(400, "Name and email are required");

    const newUser = await createUser({ name, email } as User);
    ctx.body = newUser;
  } catch (error: any) {
    ctx.throw(error.status || 400, error.message || "Bad Request");
  }
});

userRouter.patch("/:id", authMiddleware, async (ctx) => {
  try {
    const userId = ctx.params.id;
    const { name, email } = ctx.request.body as {
      name?: string;
      email?: string;
    };

    if (!userId) ctx.throw(400, "User ID is required");

    const user = await getUserById(userId);
    if (!user) ctx.throw(404, "User not found");

    const updatedUser = await updateUser(userId, { name, email } as any);
    ctx.body = updatedUser;
  } catch (error: any) {
    ctx.throw(error.status, error.message);
  }
});

userRouter.delete("/:id", authMiddleware, async (ctx) => {
  try {
    const userId = ctx.params.id;

    if (!userId) ctx.throw(400, "User ID is required");

    await deleteUser(userId);
    ctx.status = 204;
  } catch (error: any) {
    ctx.throw(error.status, error.message);
  }
});

export default userRouter;
