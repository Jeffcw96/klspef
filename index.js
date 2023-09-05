const axios = require("axios");
const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const url = `https://appsys.dbkl.gov.my/klspef/aspgateway/logingateway.asp?callback=jQuery1910758393741352775_1693830453821&actiontype=userlogin&usrname=${username}&usrpass=${password}`;

  if (ctx.path === "/health") {
    ctx.status = 200;
    ctx.body = "OK";
  } else {
    const result = await axios.get(url);
    ctx.body = JSON.stringify(result);
    ctx.status = 500;
  }
});

app.listen(3000);
