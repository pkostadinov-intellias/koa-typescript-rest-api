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
        ctx.throw(400, validate.errors as any);
      }

      await next();
    } catch (error: any) {
      ctx.throw(error.status || 500, error.message);
    }
  };
