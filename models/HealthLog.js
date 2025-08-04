// backend/models/HealthLog.js
const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sleep: { type: Number, required: true },
  water: { type: Number, required: true },
  food: { type: Number, required: true },
  exercise: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthLog', healthLogSchema);
