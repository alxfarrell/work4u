import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchWithAuth } from './utils/api';

const Profile = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeLinks, setYoutubeLinks] = useState("");
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/profileview");
    }

    // Fetch workouts
    fetchWithAuth('/workouts')
      .then(data => setWorkouts(data))
      .catch(err => console.error("Error fetching workouts:", err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const workoutData = {
        name: name,
        description: description,
        youtubeLinks: youtubeLinks
      };

      if (editingWorkout) {
        const updatedWorkout = await fetchWithAuth(`/workouts/${editingWorkout._id}`, {
          method: "PUT",
          body: JSON.stringify(workoutData)
        });
        setWorkouts(workouts.map(workout => (workout._id === updatedWorkout._id ? updatedWorkout : workout)));
        setEditingWorkout(null);
      } else {
        const addedWorkout = await fetchWithAuth('/workouts', {
          method: "POST",
          body: JSON.stringify(workoutData)
        });
        setWorkouts([...workouts, addedWorkout]);
      }

      // Reset form
      setName("");
      setDescription("");
      setYoutubeLinks("");
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  const handleEdit = (workout) => {
    setEditingWorkout(workout);
    setName(workout.name);
    setDescription(workout.description);
    setYoutubeLinks(workout.youtubeLinks);
  };

  const handleDelete = async (id) => {
    try {
      await fetchWithAuth(`/workouts/${id}`, {
        method: "DELETE"
      });
      setWorkouts(workouts.filter(workout => workout._id !== id));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div className="content-container">
      <h2>Profile Page</h2>
      <p>Manage your workouts!</p>

      <h3>{editingWorkout ? "Edit Workout" : "Add New Workout"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Workout Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="YouTube Links (comma-separated)"
            value={youtubeLinks}
            onChange={(e) => setYoutubeLinks(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          {editingWorkout ? "Update Workout" : "Save Workout"}
        </button>
      </form>

      <h3>Saved Workouts</h3>
      {Array.isArray(workouts) && workouts.map((workout) => (
        <div key={workout._id} className="workout-card">
          <h4>{workout.name}</h4>
          <p>{workout.description}</p>
          {workout.youtubeLinks && (
            <div className="workout-links">
              {workout.youtubeLinks.split(",").map((link, index) => (
                <a 
                  key={index}
                  href={link.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube-link"
                >
                  Watch Workout {index + 1}
                </a>
              ))}
            </div>
          )}
          <div className="workout-actions">
            <button onClick={() => handleEdit(workout)}>Edit</button>
            <button onClick={() => handleDelete(workout._id)}>Delete</button>
          </div>
        </div>
      ))}

      <div className="profile-actions">
        <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
          Logout
        </button>
        <Link to="/profileview" className="nav-link">View Public Profile</Link>
      </div>
    </div>
  );
};

export default Profile;