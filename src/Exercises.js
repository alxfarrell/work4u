// src/Exercises.js
import React, { useEffect, useState } from 'react';
import {
  getAllExercises,
  getRandomWorkout
} from './utils/api';

export default function Exercises() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllExercises()
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <div className="content-container">
      <h2>Exercise Library</h2>
      <button
        className="submit-btn"
        onClick={() =>
          getRandomWorkout('Chest', 'Beginner', 3).then(data =>
            alert(JSON.stringify(data, null, 2))
          )
        }
      >
        🎲 3 Beginner Chest moves
      </button>
      <div className="workouts-grid">
        {list.map((e, i) => (
          <div key={i} className="workout-card">
            <h4>{e.Exercise}</h4>
            <p><strong>Group:</strong> {e.MuscleGroup}</p>
            <p><strong>Level:</strong> {e.Level}</p>
            <p><strong>Target:</strong> {e['U/L/C']}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
