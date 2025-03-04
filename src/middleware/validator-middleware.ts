import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Context, Next } from "koa";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const validatorMiddleware =
  (schema: object) => async (ctx: Context, next: Next) => {
    try {
      const validate = ajv.compile(schema);
      const valid = validate(ctx.request.body);

      if (!valid) {
        ctx.status = 400;
        ctx.body = validate.errors?.map((err) => err.message);

        return;
      }

      await next();
    } catch (error: any) {
      ctx.status = error.status || 500;
      ctx.body = {
        status: "error",
        message: error.message || "Internal Server Error"
      };
    }
  };
