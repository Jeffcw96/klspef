const axios = require("axios");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const app = new Koa();

app.use(bodyParser({ enableTypes: ["json", "text"] }));

app.use(async (ctx) => {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  if (ctx.path === "/health") {
    ctx.status = 200;
    ctx.body = ctx.request.body || "Not body found";
  }
});

app.listen(3000);
