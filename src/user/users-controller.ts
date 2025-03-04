import { Context } from "koa";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser
} from "./user-service";
import { User } from "./user";

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

//usually it will be beter with query rather than params, but for easier postman testing i made it like this
export const getUserByEmailController = async (ctx: Context) => {
  try {
    const email = ctx.params.email;
    if (!email) ctx.throw(400, "email is required");

    const user = await getUserByEmail(email);
    if (!user) ctx.throw(404, "User not found");

    ctx.body = user;
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

    const newUserData = ctx.request.body as User;

    if (!userId) ctx.throw(400, "User ID is required");

    const user = await getUserById(userId);
    if (!user) ctx.throw(404, "User not found");

    const updatedUser = await updateUser(userId, newUserData);
    ctx.body = updatedUser;
  } catch (error: any) {
    ctx.throw(error.status || 500, error.message || "Internal Server Error");
  }
};

export const deleteUserController = async (ctx: Context) => {
  try {
    const userId = ctx.params.id;
    if (!userId) ctx.throw(400, "User ID is required");

    if (!(await getUserById(userId))) {
      ctx.throw(404, "User not found");
    }

    await deleteUser(userId);
    ctx.status = 204;
  } catch (error: any) {
    ctx.throw(error.status || 500, error.message || "Internal Server Error");
  }
};
