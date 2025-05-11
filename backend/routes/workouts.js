const router = require('express').Router();
const Workout = require('../models/workout');
const auth = require('../middleware/auth');

// Get all workouts for a user
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id });
    res.json(workouts);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Add a new workout
router.post('/', auth, async (req, res) => {
  try {
    const newWorkout = new Workout({
      userId: req.user._id,
      name: req.body.name,
      description: req.body.description,
      images: req.body.images,
      youtubeLinks: req.body.youtubeLinks
    });

    const savedWorkout = await newWorkout.save();
    res.json(savedWorkout);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Get a specific workout
router.get('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!workout) {
      return res.status(404).json('Workout not found');
    }
    res.json(workout);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Update a workout
router.put('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        name: req.body.name,
        description: req.body.description,
        images: req.body.images,
        youtubeLinks: req.body.youtubeLinks
      },
      { new: true }
    );
    if (!workout) {
      return res.status(404).json('Workout not found');
    }
    res.json(workout);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Delete a workout
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!workout) {
      return res.status(404).json('Workout not found');
    }
    res.json('Workout deleted');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router; 