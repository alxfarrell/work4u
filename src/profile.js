import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [youtubeLinks, setYoutubeLinks] = useState("");
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/profileview");
    }

    const token = localStorage.getItem("token");
    fetch("http://localhost:4000/api/workouts", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setWorkouts(data))
      .catch(err => console.error("Error fetching workouts:", err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const workoutData = {
      name: name,
      description: description,
      images: images,
      youtubeLinks: youtubeLinks
    };

    try {
      if (editingWorkout) {
        const response = await fetch(`http://localhost:4000/api/workouts/${editingWorkout._id}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(workoutData),
        });

        if (!response.ok) throw new Error("Failed to update workout");

        const updatedWorkout = await response.json();
        setWorkouts(workouts.map(workout => (workout._id === updatedWorkout._id ? updatedWorkout : workout)));
        setEditingWorkout(null);
      } else {
        const response = await fetch("http://localhost:4000/api/workouts", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(workoutData),
        });

        if (!response.ok) throw new Error("Failed to add workout");

        const addedWorkout = await response.json();
        setWorkouts([...workouts, addedWorkout]);
      }

      // Reset form
      setName("");
      setDescription("");
      setImages("");
      setYoutubeLinks("");
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  const handleEdit = (workout) => {
    setEditingWorkout(workout);
    setName(workout.name);
    setDescription(workout.description);
    setImages(workout.images);
    setYoutubeLinks(workout.youtubeLinks);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to delete workout");

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
            placeholder="Image URLs (comma-separated)"
            value={images}
            onChange={(e) => setImages(e.target.value)}
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
      <div className="workouts-grid">
        {Array.isArray(workouts) && workouts.map((workout) => (
          <div key={workout._id} className="workout-card">
            <h4>{workout.name}</h4>
            <p>{workout.description}</p>
            {workout.images && (
              <div className="workout-images">
                {workout.images.split(",").map((image, index) => (
                  <img key={index} src={image.trim()} alt={`Workout ${index + 1}`} width="150" />
                ))}
              </div>
            )}
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
      </div>

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