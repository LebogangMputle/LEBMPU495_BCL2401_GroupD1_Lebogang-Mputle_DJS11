// import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1> 📻Podcast App</h1>
      <div className="links">
        <Link to="/">🏠Home</Link>
        <Link to="/podcasts">🎙️Podcasts</Link>
        <Link to="/favourites">❤️Favourites</Link>
      </div>
    </nav>
  );
};

export default Navbar;
