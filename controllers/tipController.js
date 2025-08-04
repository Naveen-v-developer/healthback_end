const HealthLog = require('../models/HealthLog');

exports.getDailyTip = async (req, res) => {
  const { userId } = req.body;

  try {
    const latestLog = await HealthLog.findOne({ userId }).sort({ date: -1 });

    let tip = 'Stay consistent with your health goals!';

    if (!latestLog) {
      tip = 'Start tracking your vitals to receive personalized tips.';
    } else {
      const { sleep, water, food, exercise } = latestLog;

      if (sleep < 6) {
        tip = '😴 Try to get at least 7–8 hours of quality sleep tonight.';
      } else if (water < 5) {
        tip = '💧 Increase your water intake to stay hydrated.';
      } else if (food < 5) {
        tip = '🥗 Include more fruits and vegetables in your meals.';
      } else if (exercise < 3) {
        tip = '🏃‍♂️ Add a short walk or workout to your day.';
      } else {
        tip = '✅ Great job! Keep maintaining your healthy routine.';
      }
    }

    res.json({ tip });
  } catch (err) {
    console.error('Error getting tip:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
