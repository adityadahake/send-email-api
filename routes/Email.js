const express = require("express");
const controller = require("../controllers/EmailController");

const router = express.Router();

router.get('/', (req, res) => {
    res.render('EmailForm');
});

router.post("/send", controller.post);
router.post("/send_without_queue", controller.send_without_queue);

module.exports = router;
