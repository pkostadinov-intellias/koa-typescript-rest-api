import { Context, Next } from "koa";
import { verifyToken } from "../utils/token";

export const authMiddleware = async (ctx: Context, next: Next) => {
  const authHeader = ctx.get("authorization");

  if (!authHeader) {
    ctx.throw(401, "Unauthorized: Missing Authorization header");
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token);

  if (!decoded) {
    ctx.throw(403, "Invalid or Expired Token");
  }

  ctx.state.user = decoded;

  await next();
};
