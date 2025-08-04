const axios = require("axios");
const Score = require("../models/scoreModel");

exports.predictNextScore = async (req, res) => {
  try {
    const userId = req.params.userId;

    const scores = await Score.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    if (scores.length < 5) {
      return res.status(400).json({ error: "Not enough score history" });
    }

    // Extract the score values
    const last5Scores = scores.reverse().map((s) => s.score);

    // Call the Flask API
    const mlResponse = await axios.get("http://localhost:5001/predict-score", {
      params: {
        scores: last5Scores.join(","),
      },
    });

    return res.json({ predictedScore: mlResponse.data.predicted_score });
  } catch (error) {
    console.error("Prediction Error:", error.message);
    return res.status(500).json({ error: "Failed to predict score" });
  }
};
