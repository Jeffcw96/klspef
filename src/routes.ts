import Router from "@koa/router";

export const router = new Router();

router.post("/timetable", (ctx) => {
  console.log("Request bopdy", JSON.stringify(ctx.request.body));
  ctx.body = "Received with no thanks";
});
