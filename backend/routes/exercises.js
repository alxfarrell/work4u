const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '..', 'exercise-data.json');
const exerciseData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))["Exercise List"];

// GET /api/exercises
router.get('/', (req, res) => res.json(exerciseData));

// GET /api/workout/:muscleGroup
router.get('/workout/:muscleGroup', (req, res) => {
  const { muscleGroup } = req.params;
  const matches = exerciseData.filter(e => e.MuscleGroup === muscleGroup);
  if (!matches.length) return res.status(404).json({ error: 'no matches' });
  res.json(matches[Math.floor(Math.random() * matches.length)]);
});

// GET /api/workout-target/:target  (?level=Beginner)
router.get('/workout-target/:target', (req, res) => {
  const { target } = req.params;           // Upper | Lower | Core
  const { level } = req.query;             // optional
  let matches = exerciseData.filter(e => e["U/L/C"] === target);
  if (level) matches = matches.filter(e => e.Level === level);
  if (!matches.length) return res.status(404).json({ error: 'no matches' });
  res.json(matches[Math.floor(Math.random() * matches.length)]);
});

// GET /api/random-workout  (?muscleGroup=Chest&level=Beginner&num=3)
router.get('/random-workout', (req, res) => {
  const { muscleGroup, level, num = 1 } = req.query;
  if (!muscleGroup) return res.status(400).json({ error: 'muscleGroup required' });
  let matches = exerciseData.filter(e => e.MuscleGroup === muscleGroup);
  if (level) matches = matches.filter(e => e.Level === level);
  const pick = [];
  for (let i = 0; i < Math.min(num, matches.length); i++) {
    const idx = Math.floor(Math.random() * matches.length);
    pick.push(matches.splice(idx, 1)[0]);
  }
  res.json(pick);
});

// GET /api/exercises/level/:level
router.get('/level/:level', (req, res) => {
  const matches = exerciseData.filter(e => e.Level === req.params.level);
  res.json(matches);
});

module.exports = router;
