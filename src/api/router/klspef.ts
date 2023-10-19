import Router from "@koa/router";
import * as klspef from "../klspef";

export const klspefRouter = new Router().post(
  "timetable",
  "/timetable",
  klspef.getTimeTable
);
