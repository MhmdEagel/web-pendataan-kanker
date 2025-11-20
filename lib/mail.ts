import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const emailHtml = `<html><body><div style='background-color: #157145; padding-top: 10px;padding-bottom: 10px;margin-bottom: 10px;'><h1 style='font-size: larger; color: white; text-align: center;' >Verification Code</h1></div><div style='text-align: center;'><p style='font-size: large;'>Berikut kode verifikasi anda</p><div style='font-size: 32px; font-weight: bold; letter-spacing: 10px;'>${token}</div></div></body></html>`;

  await transporter.sendMail({
    from: process.env.GMAIL_USERNAME,
    to: email,
    subject: "RSUD Arifin Achmad | Authentication",
    html: emailHtml,
  });
};
