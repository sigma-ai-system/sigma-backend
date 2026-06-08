const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const apiRoutes = require('./routes/api.js');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Express API!');
});

// API Routes
app.use('/api', apiRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
