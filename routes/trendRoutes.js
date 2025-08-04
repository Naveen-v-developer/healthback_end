// backend/routes/trendRoutes.js
const express = require('express');
const router = express.Router();
const { predictTrend } = require('../controllers/trendController');

router.post('/predict', predictTrend);

module.exports = router;
