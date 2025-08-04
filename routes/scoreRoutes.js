// backend/routes/scoreRoutes.js
const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');



router.post('/calculate', scoreController.calculateScore);
router.post('/add', scoreController.calculateScore);
router.get('/test', (req, res) => {
  res.send('✅ Score route working');
});


module.exports = router;
