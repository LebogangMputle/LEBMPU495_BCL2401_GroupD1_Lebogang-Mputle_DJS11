// src/Pages/Favourites.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Favourites.css';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(savedFavourites);
  }, []);

  const removeFavourite = (id) => {
    const updatedFavourites = favourites.filter(podcast => podcast.id !== id);
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  return (
    <div className="favourites">
      <h2>Favourite Podcasts</h2>
      <div className="favourites-list">
        {favourites.length > 0 ? (
          favourites.map(podcast => (
            <div key={podcast.id} className="favourite-card">
              <img src={podcast.image} alt={podcast.title} className="favourite-image" />
              <div className="favourite-info">
                <h3>{podcast.title}</h3>
                <button onClick={() => removeFavourite(podcast.id)}>Remove</button>
                <Link to={`/seasons/${podcast.id}`} className="favourite-link">View Seasons</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No favourite podcasts available</p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
