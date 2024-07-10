const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const emailRouter = require("./routes/Email");
app.use("/email", emailRouter);

const PORT = process.env.PORT || 4300;
app.listen(PORT, () => {
  console.log(`Sever started at http://localhost:${PORT}`);
});
