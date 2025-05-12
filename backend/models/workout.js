const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  youtubeLinks: { type: String },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout; 