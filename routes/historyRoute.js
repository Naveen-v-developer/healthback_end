// routes/historyRoute.js
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const Score = require('../models/Score'); // Adjust path as needed

console.log("📥 historyRoute loaded");

router.get('/history/:userId', async (req, res) => {
  console.log('👉 GET /history/:userId triggered');

  try {
    const userId = req.params.userId.trim();
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    const scores = await Score.find({ userId: userId })
      .sort({ date: -1 })
      .limit(5);

    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
