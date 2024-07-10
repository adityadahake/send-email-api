import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();

app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { from, to, subject, text } = req.body;

  // Use a test account as this is a tutorial
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  console.log("Sending mail to %s", to);

  let info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html: `<strong>${text}</strong>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.json({
    message: "Email Sent",
  });
});

app.listen(4300, () => {
  console.log("Server started at http://localhost:4300");
});
