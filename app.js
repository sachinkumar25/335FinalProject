require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const indexRoutes = require('./routes/index');
const statsRoutes = require('./routes/stats');

const app = express();

console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set (not showing for security)' : 'Not set');
console.log('API URI:', process.env.BALL_DONT_LIE_API ? 'Set' : 'Not set');
console.log('API Key:', process.env.BALL_DONT_LIE_API_KEY ? 'Set (not showing for security)' : 'Not set');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lebron-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('Could not connect to MongoDB:', err.message);
  console.log('Starting server without MongoDB connection...');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.apiKey = '75205853-7356-4945-9bd1-6b44232659d0';
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRoutes);
app.use('/stats', statsRoutes);

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Server error occurred');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});