import Koa from "koa";
import bodyParser from "koa-bodyparser";
import koaPinoLogger from "koa-pino-logger";
import { router } from "./routes";

const app = new Koa();
console.log("halo");
app.use(
  bodyParser({ formLimit: "10mb", jsonLimit: "10mb", textLimit: "10mb" })
);
app.use(koaPinoLogger());
app.use(router.routes());

app.use(async (ctx) => {
  if (ctx.path === "/health") {
    ctx.status = 200;
    ctx.body = "GOod";
  }
});

app.listen(3000);
