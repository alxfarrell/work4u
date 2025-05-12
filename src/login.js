import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchWithAuth } from './utils/api';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Restore form data from sessionStorage if exists
  useEffect(() => {
    const savedUsername = sessionStorage.getItem('loginUsername');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Save form data to sessionStorage
      sessionStorage.setItem('loginUsername', username);

      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // store token and user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Clear session storage on successful login
      sessionStorage.removeItem('loginUsername');
      navigate("/profile");
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;