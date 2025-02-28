import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Context, Next } from "koa";

const ajv = new Ajv();
addFormats(ajv);

export const validatorMiddleware =
  (schema: Object) => async (ctx: Context, next: Next) => {
    const validate = ajv.compile(schema);
    const valid = validate(ctx.request.body);
    if (!valid) {
      ctx.throw(400, validate.errors as any);
    }

    await next();
  };
