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
  // const jsonRegex = /\[(.+)]/s; // Capture everything between the first "{" and the last "}]"
  // const match = (ctx.request.body as any).message.match(jsonRegex);

  // Figure out how to remove the additional } }

  console.log("match", cleanedMessage);

  const jsonText = JSON.stringify(cleanedMessage);
  fs.writeFileSync("output.txt", jsonText);
  ctx.body = "Received with no thanks";
});
