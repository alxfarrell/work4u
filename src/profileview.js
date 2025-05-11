import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const ProfileView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/profile"); // Redirect if already logged in
    }
  }, []);

  return (
    <div className="content-container">
      <h2>Discover More!</h2>
      <p>Join now and get personalized workout plans.</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate("/register")}>Sign Up</button>
        <div style={{ marginTop: '10px' }}>
          <Link to="/login" className="nav-link">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;