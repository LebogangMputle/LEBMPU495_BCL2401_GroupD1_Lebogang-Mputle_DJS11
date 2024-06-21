import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Favourites.css';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchFavourites = () => {
      setLoading(true); // Set loading to true when fetching data
      const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
      setFavourites(savedFavourites);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchFavourites();
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
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : favourites.length > 0 ? (
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
