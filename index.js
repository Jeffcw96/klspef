const axios = require("axios");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("pino")();

const app = new Koa();

app.use(bodyParser({ enableTypes: ["json", "text"] }));

app.use(async (ctx) => {
  if (ctx.path === "/health") {
    ctx.status = 200;
    console.log("request body", ctx.request.body);
    logger.info("hello world", ctx.request.body);
    ctx.body = ctx.request.body || "Not body found";
  }
});

app.listen(3000);
