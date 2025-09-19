const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./models/db');
const scoreRoutes = require('./routes/scoreRoutes');
const tipRoutes = require('./routes/tipRoutes');
const trendRoutes = require('./routes/trendRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const predictedScoreRoutes = require('./routes/predictedScoreRoutes');
const historyRoutes = require('./routes/historyRoutes')


const historyRoute = require('./routes/historyRoute');


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'https://healthfrontend1.vercel.app'
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/score', scoreRoutes);
app.use('/api/tips', tipRoutes);
app.use('/api/trend', trendRoutes);

app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/scores', historyRoute);
app.use('/api/predicted-scores', predictedScoreRoutes);
app.use('/api/sco', historyRoutes);






// Root route (optional)
app.get('/', (req, res) => {
  res.send('🌿 HealthMark API is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 HealthMark backend running on port ${PORT}`);
});
