import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import config from "./config/config";
import userRouter from "./routes/user-routes";
import { db } from "./db/db";
import { authRouter } from "./routes/auth-routes";
import { authMiddleware } from "./middleware/auth-middleware";
import taskRouter from "./routes/task-routes";

(async () => {
  db.init();

  const app = new Koa();

  const router = new Router({
    prefix: "/api/v1"
  });

  //Public routes
  router.use(authRouter.routes());

  router.use(authMiddleware);

  //Private routes
  router.use(userRouter.routes());
  router.use(taskRouter.routes());

  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(config.port, () => {
    console.log(
      `======Server running on http://localhost:${config.port}======`
    );
  });
})();
