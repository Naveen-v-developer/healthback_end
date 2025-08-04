import numpy as np
from sklearn.linear_model import LinearRegression
import pickle
import os

# Sample training data: sequences of last 5 scores -> next day score
# Format: [5 previous scores], next_score
data = [
    ([40, 45, 50, 48, 52], 55),
    ([60, 62, 58, 59, 61], 63),
    ([30, 32, 28, 29, 31], 33),
    ([70, 72, 75, 74, 76], 78),
    ([20, 22, 25, 24, 26], 28),
]

X = np.array([item[0] for item in data])
y = np.array([item[1] for item in data])

model = LinearRegression()
model.fit(X, y)

# Save model
os.makedirs("model", exist_ok=True)
with open("model/score_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model trained and saved.")
