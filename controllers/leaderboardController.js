const Score = require('../models/Score');
const User = require('../models/User');

const getWeeklyLeaderboard = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const pipeline = [
      { $match: { date: { $gte: sevenDaysAgo } } },
      { $group: {
        _id: '$userId',
        bestScore: { $max: '$score' }
      }},
      { $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }},
      { $unwind: '$user' },
      { $project: {
        _id: 0,
        username: '$user.username',
        bestScore: 1
      }},
      { $sort: { bestScore: -1 } },
      { $limit: 10 }
    ];

    const leaderboard = await Score.aggregate(pipeline);

    res.json(leaderboard);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getWeeklyLeaderboard };
