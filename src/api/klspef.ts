import { Context } from 'koa';
import { config } from 'src/config';
import { klspefHtmlEmailMapper, sendEmail } from 'src/service/sendEmail';
import { KlspefMappedPayload, KlspefRawPayload } from 'src/types/klspef';
import path from 'path';
import { klspefLogger } from 'src/utils/logger';
import { formatDate } from 'src/utils/date';

const KLSPEF = config.KLSPEF;
export const getTimeTable = async (ctx: Context) => {
  const wordsAndSymbolsToRemove = ['\\[', '\\]', '\\}\\}'];
  const pattern = wordsAndSymbolsToRemove.join('|');
  const cleanedMessage = (ctx.request.body as any).message.replace(new RegExp(pattern, 'g'), '');
  const replacedCurlyBraces = cleanedMessage.replaceAll('} }', '}');
  const removedDatamasaKey = `[${replacedCurlyBraces.replaceAll(`"datamasa": `, '')}]`;
  const sanitizedPayload: KlspefRawPayload[] = JSON.parse(removedDatamasaKey);

  const mappedPayload = sanitizedPayload.reduce((acc: KlspefMappedPayload, payload) => {
    const location = KLSPEF.LOCATION_IDS[payload.IDLOCATION];
    const courtIds = KLSPEF.TIME_TABLE_IDS[location];

    return payload.IDTIME === KLSPEF.TIME_IDS[location] && Object.values(courtIds).includes(payload.IDCOURT)
      ? {
          ...acc,
          [payload.IDLOCATION]: [
            ...(acc[payload.IDLOCATION] || []),
            {
              name: payload.NAMELOCATION,
              timeId: payload.IDTIME,
              locationId: payload.IDLOCATION,
              courtId: payload.IDCOURT,
              courtLabel: mapCourtLabel(courtIds, payload.IDCOURT),
              statusId: payload.STATUS,
              statusLabel: mapCourtStatusLabel(payload.STATUS),
            },
          ],
        }
      : acc;
  }, {});

  const date = new Date();
  const dateAfterThreeWeeks = new Date(date.setDate(date.getDate() + 21));
  const { todayDate, todayDay } = formatDate(dateAfterThreeWeeks);

  const html = await klspefHtmlEmailMapper(
    path.join(__dirname, '../service/emailHtmlTemplate/klspef.html'),
    mappedPayload,
    `${todayDate} | ${todayDay}`
  );

  await sendEmail({
    mainRecipient: config.MAIN_RECIPIENT,
    ccRecipients: config.CC_RECIPIENTS,
    subject: 'KLSPEF timetable',
    text: '',
    html,
  });

  klspefLogger.info(
    {
      message: 'KLSPEF Email sent successfully',
      date: todayDate,
      day: todayDay,
    },
    'KLSPEF Email sent successfully'
  );
};

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
  for (const [label, status] of Object.entries(KLSPEF.COURT_STATUS)) {
    if (status === statusId) {
      return label;
    }
  }
};
