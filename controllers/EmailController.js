const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { from, to, subject, text } = req.body;

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

  console.log(`Sending mail to ${to}`);

  let info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html: `<strong>${text}</strong>`,
  });

  console.log(`Message sent: ${info.messageId}`);
  console.log(`Preview url: ${nodemailer.getTestMessageUrl(info)}`);

  res.json({
    message: "Email Sent",
    messageId: info.messageId,
    previewUrl: nodemailer.getTestMessageUrl(info),
  });
};

module.exports = {
  get: (req, res) => {
    res.send("This is get request from EmailController");
  },
  post: sendEmail,
};
