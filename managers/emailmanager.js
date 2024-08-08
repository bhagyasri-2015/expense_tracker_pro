const nodemailer = require("nodemailer");

const emailmanager = async (to, text, html, subject) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "868a25621683c0",
      pass: "3d48033f3d8541",
    },
  });

  transport.sendMail({
    to: to,
    from: "info@expensetracker.com",
    text: text,
    html: html,
    subject: "subject",
  });
};
module.exports = emailmanager;
