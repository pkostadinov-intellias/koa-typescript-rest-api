import { Context } from "koa";
import { createUser, getUserByEmail } from "../user/user-service";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/token";
import { User } from "../user/user";

export const signUp = async (ctx: Context) => {
  try {
    const user = await createUser(ctx.request.body as User);
    ctx.status = 201;
    ctx.body = user;
  } catch (error: any) {
    ctx.throw(403, error.message);
  }
};

export const signIn = async (ctx: Context) => {
  try {
    const { email, password } = ctx.request.body as User;
    const user = await getUserByEmail(email);

    if (!user) {
      ctx.throw(400, "There is no registered user with this email");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      ctx.throw(400, "Wrong Password");
    }

    ctx.body = { token: createToken(user) };
    ctx.status = 200;
  } catch (error: any) {
    ctx.throw(error.status || 500, error.message || "Internal Server Error");
  }
};
