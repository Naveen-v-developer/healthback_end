// backend/utils/tipGenerator.js
const tips = [
  'Drink at least 8 glasses of water today.',
  'Take a 30-minute walk outside.',
  'Eat 3 servings of fruits or vegetables.',
  'Sleep at least 7 hours tonight.',
  'Avoid sugar for 1 day!',
  'Do 10 minutes of deep breathing.',
];

function getRandomTip() {
  const index = Math.floor(Math.random() * tips.length);
  return tips[index];
}

module.exports = getRandomTip;
