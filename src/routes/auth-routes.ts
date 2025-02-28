import Router from "koa-router";
import { validatorMiddleware } from "../middleware/validator-middleware";
import { signInValidationSchema } from "../schemas/signIn.validation-schema";
import { createUser, getUserByEmail, User } from "../services/user-service";
import { createUserValidationSchema } from "../schemas/users.validation-schema";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/token";

export const authRouter = new Router({
  prefix: "/auth"
});

authRouter.post(
  "/sign-up",
  validatorMiddleware(createUserValidationSchema),
  async (ctx) => {
    try {
      const user = await createUser(ctx.request.body as User);
      ctx.status = 201;
      ctx.body = user;
    } catch (error: any) {
      ctx.throw(403, error.message);
    }
  }
);

authRouter.post(
  "/sign-in",
  validatorMiddleware(signInValidationSchema),
  async (ctx) => {
    try {
      const { email, password } = ctx.request.body as User;

      const user = await getUserByEmail(email);

      if (!user) {
        ctx.throw(400, "There is no registered user with this email");
        return;
      }

      if (!bcrypt.compareSync(password, user.password)) {
        ctx.throw(400, "Wrong Password");
        return;
      }

      ctx.body = {
        token: createToken(user)
      };

      ctx.status = 200;
    } catch (error: any) {
      ctx.throw(error.status, error.message);
    }
  }
);
