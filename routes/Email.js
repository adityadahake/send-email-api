const express = require("express");
const controller = require("../controllers/EmailController");

const router = express.Router();

router.get("/", controller.get);
router.post("/send", controller.post);

module.exports = router;
