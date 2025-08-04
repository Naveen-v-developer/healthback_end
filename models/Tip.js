// backend/models/Tip.js
const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tip: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tip', tipSchema);
