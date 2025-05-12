import React from 'react';

const About = () => {
  return (
    <div className="content-container">
      <h2>About Work4U</h2>
      
      <section className="about-section">
        <div className="app-overview">
          <h3>Welcome to Work4U</h3>
          <p>
            Work4U is a modern fitness application designed to help users create, manage, and track their workout routines. 
            Our platform combines user-friendly design with powerful features to make fitness management accessible to everyone.
          </p>
        </div>

        <div className="features">
          <h3>Key Features</h3>
          <div className="feature-category">
            <h4>User Experience</h4>
            <ul>
              <li>Modern, responsive UI design that works on all devices</li>
              <li>Intuitive workout management interface</li>
              <li>Real-time form validation for better user feedback</li>
              <li>Seamless navigation between different sections</li>
            </ul>
          </div>

          <div className="feature-category">
            <h4>Workout Management</h4>
            <ul>
              <li>Create, read, update, and delete (CRUD) workout routines</li>
              <li>Add detailed descriptions for each workout</li>
              <li>Integrate YouTube videos for workout demonstrations</li>
              <li>Organize workouts with custom categories</li>
            </ul>
          </div>

          <div className="feature-category">
            <h4>Security & Authentication</h4>
            <ul>
              <li>Secure user authentication with JWT</li>
              <li>Protected routes for authenticated users</li>
              <li>Password encryption using bcrypt</li>
              <li>Secure API endpoints with proper validation</li>
            </ul>
          </div>

          <div className="feature-category">
            <h4>Data Management</h4>
            <ul>
              <li>Client-side storage for better performance</li>
              <li>Server-side validation for data integrity</li>
              <li>MongoDB database for reliable data storage</li>
              <li>Efficient data retrieval and updates</li>
            </ul>
          </div>
        </div>

        <div className="tech-stack">
          <h3>Technical Implementation</h3>
          
          <div className="tech-category">
            <h4>Frontend</h4>
            <ul>
              <li>React.js - Modern UI components and state management</li>
              <li>React Router - Client-side routing and navigation</li>
              <li>CSS3 - Responsive and modern styling</li>
              <li>Form validation - Client-side input validation</li>
            </ul>
          </div>

          <div className="tech-category">
            <h4>Backend</h4>
            <ul>
              <li>Node.js & Express.js - Robust API server</li>
              <li>MongoDB & Mongoose - Data modeling and storage</li>
              <li>JWT - Secure authentication system</li>
              <li>bcrypt - Password encryption</li>
            </ul>
          </div>

          <div className="tech-category">
            <h4>Security Features</h4>
            <ul>
              <li>JWT-based authentication</li>
              <li>Password hashing with bcrypt</li>
              <li>Protected API endpoints</li>
              <li>Input validation and sanitization</li>
            </ul>
          </div>
        </div>

        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>
            Have questions or feedback? We'd love to hear from you! Use our contact form to reach out, 
            and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About; 