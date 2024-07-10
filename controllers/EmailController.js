const nodemailer = require("nodemailer");
const Bull = require("bull")

const emailQueue = new Bull("email", {
  redis : "localhost:6379",
})
const sendNewEmail = (email) => {
  emailQueue.add({...email});
}
const sendEmail = async (req, res) => {
  const { from, to, subject, text } = req.body;
  await sendNewEmail({from,to,subject,text});
  console.log("added to queue")
  res.json({
    message: "added to queue",
  });
  // const testAccount = await nodemailer.createTestAccount();

  // const transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: testAccount.user,
  //     pass: testAccount.pass,
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });

  // console.log(`Sending mail to ${to}`);

  // let info = await transporter.sendMail({
  //   from,
  //   to,
  //   subject,
  //   text,
  //   html: `<strong>${text}</strong>`,
  // });

  // console.log(`Message sent: ${info.messageId}`);
  // console.log(`Preview url: ${nodemailer.getTestMessageUrl(info)}`);

  // res.json({
  //   message: "Email Sent",
  //   messageId: info.messageId,
  //   previewUrl: nodemailer.getTestMessageUrl(info),
  // });
};

module.exports = {
  get: (req, res) => {
    res.send("This is get request from EmailController");
  },
  post: sendEmail,
};
