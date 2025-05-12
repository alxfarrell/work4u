import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchWithAuth } from './utils/api';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Restore form data from sessionStorage if exists
  useEffect(() => {
    const savedUsername = sessionStorage.getItem('registerUsername');
    const savedEmail = sessionStorage.getItem('registerEmail');
    if (savedUsername) setUsername(savedUsername);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      // Save form data to sessionStorage
      sessionStorage.setItem('registerUsername', username);
      sessionStorage.setItem('registerEmail', email);

      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // store token and user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Clear session storage on successful registration
      sessionStorage.removeItem('registerUsername');
      sessionStorage.removeItem('registerEmail');
      navigate("/profile");
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;