const express = require('express');
const router = express.Router();
const { getWeeklyLeaderboard } = require('../controllers/leaderboardController');

router.get('/', getWeeklyLeaderboard);

module.exports = router;
