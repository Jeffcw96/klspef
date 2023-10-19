import Router from "@koa/router";
import { klspefRouter } from "./klspef";

export const router = new Router().use(
  "/klspef",
  klspefRouter.routes(),
  klspefRouter.allowedMethods()
);
