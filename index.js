const express = require("express");
const bodyParser = require("body-parser");
const emailRouter = require("./routes/Email");
const landingRouter = require("./routes/Landing");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4300;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use("/email", emailRouter);
app.use('*', landingRouter);

app.listen(PORT, () => {
  console.log(`Sever started at http://localhost:${PORT}`);
});
