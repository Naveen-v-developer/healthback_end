// backend/routes/tipRoutes.js
const express = require('express');
const router = express.Router();
const { getDailyTip } = require('../controllers/tipController');

router.post('/daily', getDailyTip); // changed from GET to POST to accept userId

module.exports = router;
