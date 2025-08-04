const PredictedScore = require('../models/predictedScoreModel');
const mongoose = require('mongoose');

// POST /api/predicted-scores
exports.savePredictedScore = async (req, res) => {
  try {
    const { userId, predicted_score } = req.body;

    // Validate inputs
    if (!userId || predicted_score === undefined) {
      return res.status(400).json({ error: 'userId and predicted_score are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    const objectId =  mongoose.Types.ObjectId(userId);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    // Check for existing prediction for tomorrow
    const existing = await PredictedScore.findOne({
      userId: objectId,
      predicted_for_date: tomorrow
    });

    if (existing) {
      return res.status(409).json({ error: 'Prediction for tomorrow already exists' });
    }

    const newScore = await PredictedScore.create({
      userId: objectId,
      predicted_score,
      predicted_for_date: tomorrow
    });

    res.status(201).json(newScore);
  } catch (err) {
    console.error('❌ Error saving prediction:', err);
    res.status(500).json({ error: 'Server error while saving prediction' });
  }
};

// GET /api/predicted-scores/:userId
exports.getPredictedScores = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('📦 Type of userId:', typeof userId);
    console.log('🔍 Value of userId:', userId);

    const predictions = await PredictedScore.find({
      userId: userId  // treat as string directly
    }).sort({ predicted_for_date: -1 });

    console.log('✅ Predictions found:', predictions.length);
    res.json(predictions);
  } catch (err) {
    console.log('❌ Error:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
