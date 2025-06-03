import { Routes, Route, Link } from "react-router-dom";
import Login from "./login";
import Profile from "./profile";
import ProfileView from "./profileview";
import Register from "./register";
import Home from "./home";
import Contact from "./Contact";
import About from "./About";
import Exercises from "./Exercises";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="nav-bar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/profileview" className="nav-link">Profile View</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/exercises" className="nav-link">Exercises</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profileview" element={<ProfileView />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/exercises" element={<Exercises />} />
      </Routes>
    </div>
  );
}

export default App;
