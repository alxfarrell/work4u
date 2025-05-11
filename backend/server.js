const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/work4u';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
const workoutsRouter = require('./routes/workouts');
const usersRouter = require('./routes/users');

app.use('/api/workouts', workoutsRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); 