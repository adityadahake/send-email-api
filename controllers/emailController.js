const sendEmail = (req, res) => {
  res.send("POST on /email/send");
};

module.exports = {
  get: (req, res) => {
    res.send("This is get request from EmailController");
  },
  post: sendEmail,
};
