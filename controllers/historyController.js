const Score = require('../models/Score');

exports.getUserHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const pastWeek = new Date();
    pastWeek.setDate(pastWeek.getDate() - 7);
    pastWeek.setHours(0, 0, 0, 0); // Optional

    const scores = await Score.find({
      userId,
      date: { $gte: pastWeek }
    })
    .sort({ date: -1 })
    .limit(7);

    res.status(200).json(scores);
  } catch (error) {
    console.error('Error fetching user history:', error);
    res.status(500).json({ error: 'Failed to fetch user history' });
  }
};
