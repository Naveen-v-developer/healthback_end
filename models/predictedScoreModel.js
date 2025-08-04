const mongoose = require('mongoose');

const predictedScoreSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  predicted_score: {
    type: Number,
    required: true
  },
  predicted_for_date: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PredictedScore', predictedScoreSchema);
