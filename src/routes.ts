import Router from "@koa/router";
import { KlspefRawPayload } from "./klspef";

export const router = new Router();

router.post("/timetable", (ctx) => {
  const wordsAndSymbolsToRemove = ["\\[", "\\]", "\\}\\}"];
  const pattern = wordsAndSymbolsToRemove.join("|");
  const cleanedMessage = (ctx.request.body as any).message.replace(
    new RegExp(pattern, "g"),
    ""
  );
  const replacedCurlyBraces = cleanedMessage.replaceAll("} }", "}");
  const removedDatamasaKey = `[${replacedCurlyBraces.replaceAll(
    `"datamasa": `,
    ""
  )}]`;
  const sanitizedPayload: KlspefRawPayload[] = JSON.parse(removedDatamasaKey);
  const mappedPayload = sanitizedPayload.flatMap((payload) => ({
    name: payload.NAMELOCATION,
    timeId: payload.IDTIME,
    locationId: payload.IDLOCATION,
    courtId: payload.IDCOURT,
    status: payload.STATUS,
  }));

  console.log("match", mappedPayload);
  ctx.body = "Received with no thanks";
});
