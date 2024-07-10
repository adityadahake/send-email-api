const express = require("express");
const bodyParser = require("body-parser");
const emailRouter = require("./routes/Email");

const app = express();
const PORT = process.env.PORT || 4300;

app.use(bodyParser.json());
app.use("/email", emailRouter);


app.listen(PORT, () => {
  console.log(`Sever started at http://localhost:${PORT}`);
});
