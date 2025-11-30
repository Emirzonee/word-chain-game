import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Word Chain Game
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-item">Play</Link>
          <Link to="/how-to-play" className="navbar-item">How to Play</Link>
          <Link to="/high-scores" className="navbar-item">High Scores</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;