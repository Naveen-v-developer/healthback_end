// backend/controllers/trendController.js
const axios = require('axios');

exports.predictTrend = async (req, res) => {
  const { userId } = req.body;

  try {
    const response = await axios.post('http://localhost:5005/predict-score', { userId });
    const predictedScore = response.data.predictedScore;

    res.status(200).json({ predictedScore });
  } catch (error) {
    console.error("Prediction error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to predict score" });
  }
};
