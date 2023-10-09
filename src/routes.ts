import Router from "@koa/router";
import fs from "fs";

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

  console.log("match", JSON.parse(removedDatamasaKey));

  // const jsonText = JSON.stringify(replacedCurlyBraces);
  // fs.writeFileSync("output.txt", jsonText);
  ctx.body = "Received with no thanks";
});
