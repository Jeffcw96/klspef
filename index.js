const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const url = `https://appsys.dbkl.gov.my/klspef/aspgateway/logingateway.asp?callback=jQuery1910758393741352775_1693830453821&actiontype=userlogin&usrname=${username}&usrpass=${password}`;

  const result = await fetch(url);
  ctx.body = JSON.stringify(result);
});

app.listen(3000);
