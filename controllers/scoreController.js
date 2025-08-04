const Score = require('../models/Score');

exports.calculateScore = async (req, res) => {
  const { userId, score, date } = req.body;

  if (!userId || score == null || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Save only the score record
    const saved = await Score.create({ userId, score, date });
    res.status(200).json({ message: 'Score saved successfully', data: saved });
  } catch (err) {
    console.error('❌ Error saving score:', err);
    res.status(500).json({ message: 'Failed to save score', error: err.message });
  }
};
