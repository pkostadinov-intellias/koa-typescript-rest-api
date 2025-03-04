import Router from "koa-router";
import { validatorMiddleware } from "../middleware/validator-middleware";
import { signInValidationSchema } from "../schemas/signIn.validation-schema";
import { createUserValidationSchema } from "../schemas/users.validation-schema";
import { signUp, signIn } from "./auth-controller";

export const authRouter = new Router({
  prefix: "/auth"
});

authRouter.post(
  "/sign-up",
  validatorMiddleware(createUserValidationSchema),
  signUp
);

authRouter.post(
  "/sign-in",
  validatorMiddleware(signInValidationSchema),
  signIn
);
