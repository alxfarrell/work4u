import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="content-container">
      <h1>Welcome to Work4U</h1>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/profileview" className="nav-link">View Profiles</Link>
      </div>
    </div>
  );
};

export default Home; 