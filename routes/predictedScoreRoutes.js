const express = require('express');
const router = express.Router();
const {
  savePredictedScore,
  getPredictedScores
} = require('../controllers/predictedScoreController');

router.post('/', savePredictedScore);
router.get('/:userId', getPredictedScores);

module.exports = router;
