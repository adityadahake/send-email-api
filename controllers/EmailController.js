const nodemailer = require("nodemailer");
const Bull = require("bull");

const emailQueue = new Bull("email", {
  // use your redis connection URL
  redis: "redis://127.0.0.1:6379",
});

const sendNewEmail = async (email) => {
  await emailQueue.add({ ...email });
};

const processEmailQueue = async (job) => {
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

  const { from, to, subject, text } = job.data;

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

  return nodemailer.getTestMessageUrl(info);
};

emailQueue.process(processEmailQueue);

const post = async (req, res) => {
  const { from, to, subject, text } = req.body;
  await sendNewEmail({ from, to, subject, text });
  
  console.log("Added to queue");

  res.json({
    message: "Email Sent",
  });
};

const send_without_queue = async (req, res) => {
  const { from, to, subject, text } = req.body;

  // Create a test account for nodemailer (useful for tutorials and testing)
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
    messageId: info.messageId,
    previewURL: nodemailer.getTestMessageUrl(info),
  });
};

module.exports = {
  post,
  send_without_queue,
};
