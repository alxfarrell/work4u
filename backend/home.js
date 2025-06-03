require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const workoutRoutes = require('./routes/workouts');
const contactRouter = require('./routes/contact');
const exercisesRouter = require('./routes/exercises');

// express app
const app = express();

// debug environment variables
console.log('MongoDB URI:', process.env.MONGO_URI);
console.log('Port:', process.env.PORT);

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/contact', contactRouter);
app.use('/api/exercises', exercisesRouter);


// connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/work4u';

mongoose.connect(mongoUri)
  .then(() => {
    // listen for requests
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log('Connected to MongoDB & listening on port', port);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  }); 