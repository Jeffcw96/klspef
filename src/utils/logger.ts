import logger from "pino";

const rootLogger = logger();
const LOG_SERVICE = {
  KLSPEF: "KLSPEF",
  WHATSAPP: "WHATSAPP",
};

export const klspefLogger = rootLogger.child({
  service: LOG_SERVICE.KLSPEF,
});

export const whatsappLogger = rootLogger.child({
  service: LOG_SERVICE.WHATSAPP,
});
