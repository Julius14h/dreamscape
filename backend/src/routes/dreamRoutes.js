const express = require("express");
const { analyzeDream } = require("../controllers/dreamController");

const router = express.Router();

router.post("/analyze-dream", analyzeDream);

module.exports = router;
