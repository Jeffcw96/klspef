import Router from "@koa/router";
import {
  COURT_STATUS,
  KlspefRawPayload,
  LOCATION,
  LOCATION_IDS,
  TIME_IDS,
  TIME_TABLE_IDS,
} from "./klspef";

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
  const mappedPayload = sanitizedPayload.flatMap((payload) => {
    const location = LOCATION_IDS[payload.IDLOCATION];
    const courtIds = TIME_TABLE_IDS[location];

    if (!location) {
      return [];
    }

    if (
      payload.IDTIME === TIME_IDS[location] &&
      Object.values(courtIds).includes(payload.IDCOURT)
    ) {
      return {
        name: payload.NAMELOCATION,
        timeId: payload.IDTIME,
        locationId: payload.IDLOCATION,
        courtId: payload.IDCOURT,
        courtLabel: mapCourtLabel(courtIds, payload.IDCOURT),
        statusId: payload.STATUS,
        statusLabel: mapCourtStatusLabel(payload.STATUS),
      };
    }

    return [];
  });

  console.log("match", mappedPayload);
  ctx.body = "Received with no thanks";
});

const mapCourtLabel = (
  courtIds: {
    COURT_1: number;
    COURT_2: number;
    COURT_3: number;
  },
  courtId: number
) => {
  const courtLabel = Object.keys(courtIds).find((courtLabel) => {
    return courtIds[courtLabel] === courtId;
  });

  return courtLabel ? courtLabel : null;
};

const mapCourtStatusLabel = (statusId: number | string | null) => {
  for (const [label, status] of Object.entries(COURT_STATUS)) {
    if (status === statusId) {
      return label;
    }
  }
};
