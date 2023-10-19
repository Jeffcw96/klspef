import nodemailer from "nodemailer";

type EmailPayload = {
  mainRecipient: string;
  ccRecipients?: string[];
  subject: string;
  html: string;
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
