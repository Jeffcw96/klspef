import nodemailer from "nodemailer";
import fs from "fs/promises";
import handlebars from "handlebars";
import { KlspefMappedPayload } from "src/types/klspef";

type EmailPayload = {
  mainRecipient: string;
  ccRecipients?: string[];
  subject: string;
  html?: string;
  text: string;
};

export const sendEmail = (emailConfig: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jeffdevslife@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        subject: emailConfig.subject,
        to: emailConfig.mainRecipient,
        cc: emailConfig.ccRecipients,
        html: emailConfig.html,
        text: emailConfig.text,
      },
      function (error, info) {
        if (error) {
          reject(error);
        }
        resolve(info);
      }
    );
  });
};

export const klspefHtmlEmailMapper = async (
  path: string,
  payload: KlspefMappedPayload
) => {
  const htmlFile = await fs.readFile(path, { encoding: "utf-8" });
  const generateHtmlTemplate = handlebars.compile(htmlFile);

  const klspefEmailPayload = Object.keys(payload).reduce(
    (accEmailPayload, locationId, ind) => {
      const venue = payload[locationId][0].name;
      const {
        courtOneAvailability,
        courtTwoAvailability,
        courtThreeAvailability,
      } = payload[locationId].reduce((acc, val) => {
        const isCourtAvailable = val.statusLabel === "AVAILABLE";
        switch (val.courtLabel) {
          case "COURT_1":
            return {
              ...acc,
              courtOneAvailability: isCourtAvailable,
            };
          case "COURT_2":
            return {
              ...acc,
              courtTwoAvailability: isCourtAvailable,
            };
          case "COURT_3":
            return {
              ...acc,
              courtThreeAvailability: isCourtAvailable,
            };
          default:
            return acc;
        }
      }, {} as any);

      return {
        ...accEmailPayload,
        [`VENUE_${ind}`]: venue,
        [`VENUE_${ind}_COURT_1_AVAILABILITY`]: courtOneAvailability,
        [`VENUE_${ind}_COURT_2_AVAILABILITY`]: courtTwoAvailability,
        [`VENUE_${ind}_COURT_3_AVAILABILITY`]: courtThreeAvailability,
      };
    },
    {}
  );

  const html = generateHtmlTemplate(klspefEmailPayload);
  return html;
};
