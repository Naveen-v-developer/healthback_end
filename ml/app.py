from flask import Flask, request, jsonify
from flask_cors import CORS 
import pickle
import numpy as np
import os
import requests

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000","http://localhost:5002"])

# Load ML model
model_path = "model/score_model.pkl"
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model not found: {model_path}. Run train_model.py first.")
with open(model_path, "rb") as f:
    model = pickle.load(f)

@app.route("/predict-score", methods=["GET"])
def predict_score():
    try:
        user_id = request.args.get("userId", "").strip()
        if not user_id:
            return jsonify({"error": "userId is required"}), 400

        # Call external API to get last 5 scores
        api_url = f"http://localhost:5002/api/scores/history/{user_id}"
        response = requests.get(api_url)

        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch scores", "details": response.json()}), 500

        score_data = response.json()

        if len(score_data) < 5:
            return jsonify({"error": "Not enough score history"}), 400

        # Extract and reverse scores to oldest → latest
        last_5_scores = [entry["score"] for entry in reversed(score_data)]
        input_array = np.array(last_5_scores).reshape(1, -1)
        prediction = model.predict(input_array)[0]

        return jsonify({"predicted_scores": round(float(prediction), 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001)
