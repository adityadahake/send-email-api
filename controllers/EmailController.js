const nodemailer = require("nodemailer");
const Bull = require("bull");

const emailQueue = new Bull("email", {
  // use your redis connection URL
  redis: "redis://127.0.0.1:6379",
});

const sendNewEmail = async (email) => {
  await emailQueue.add({ ...email });
};

module.exports = {
  get: (req, res) => {
    res.send("This is get request from EmailController");
  },
  post: async (req, res) => {
    const { from, to, subject, text } = req.body;

    await sendNewEmail({ from, to, subject, text });

    console.log("Added to queue");

    res.json({
      message: "Email Sent",
    });
  },
};
