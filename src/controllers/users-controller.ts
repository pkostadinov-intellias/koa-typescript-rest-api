import { Context } from "koa";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser
} from "../services/user-service";
import { User } from "../types/user";

export const getAllUsersController = async (ctx: Context) => {
  try {
    const users = await getAllUsers();
    ctx.body = { users };
  } catch (error: any) {
    ctx.throw(error.status || 500, error.message || "Internal Server Error");
  }
};

export const getUserByIdController = async (ctx: Context) => {
  try {
    const userId = ctx.params.id;
    if (!userId) ctx.throw(400, "User ID is required");

    const user = await getUserById(userId);
    if (!user) ctx.throw(404, "User not found");

    ctx.body = { user };
  } catch (error: any) {
    ctx.throw(error.status || 500, error.message || "Internal Server Error");
  }
};

export const createUserController = async (ctx: Context) => {
  try {
    const { name, email, password } = ctx.request.body as User;
    if (!name || !email) ctx.throw(400, "Name and email are required");

    const newUser = await createUser({ name, email, password } as User);
    ctx.body = newUser;
  } catch (error: any) {
    ctx.throw(error.status || 400, error.message || "Bad Request");
  }
};

export const updateUserController = async (ctx: Context) => {
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
    ctx.throw(error.status || 500, error.message || "Internal Server Error");
  }
};

export const deleteUserController = async (ctx: Context) => {
  try {
    const userId = ctx.params.id;
    if (!userId) ctx.throw(400, "User ID is required");

    await deleteUser(userId);
    ctx.status = 204;
  } catch (error: any) {
    ctx.throw(error.status || 500, error.message || "Internal Server Error");
  }
};
