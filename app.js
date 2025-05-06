require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const indexRoutes = require('./routes/index');
const statsRoutes = require('./routes/stats');

// Initialize Express app
const app = express();

// Log environment variables (for debugging)
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set (not showing for security)' : 'Not set');
console.log('API URI:', process.env.BALL_DONT_LIE_API ? 'Set' : 'Not set');

// Connect to MongoDB with better error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lebron-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('Could not connect to MongoDB:', err.message);
  console.log('Starting server without MongoDB connection...');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use routes
app.use('/', indexRoutes);
app.use('/stats', statsRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Server error occurred');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});