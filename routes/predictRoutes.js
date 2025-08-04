const express = require("express");
const router = express.Router();
const { predictNextScore } = require("../controllers/predictController");

router.get("/predict/:userId", predictNextScore);

module.exports = router;
