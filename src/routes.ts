import Router from "@koa/router";
import fs from "fs";

export const router = new Router();

router.post("/timetable", (ctx) => {
  console.log("Request body", ctx.request.body);
  const jsonText = JSON.stringify(ctx.request.body);
  fs.writeFileSync("output.txt", jsonText);
  ctx.body = "Received with no thanks";
});
