import Koa from "koa";
import bodyParser from "koa-bodyparser";
import koaPinoLogger from "koa-pino-logger";
import dotenv from "dotenv";
import { router } from "./api";

dotenv.config();
const app = new Koa()
  .use(bodyParser({ formLimit: "10mb", jsonLimit: "10mb", textLimit: "10mb" }))
  .use(koaPinoLogger())
  .use(router.routes())
  .use(router.allowedMethods());

app.use(async (ctx) => {
  if (ctx.path === "/health") {
    ctx.status = 200;
    ctx.body = "GOod";
  }
});

app.listen(3000);
