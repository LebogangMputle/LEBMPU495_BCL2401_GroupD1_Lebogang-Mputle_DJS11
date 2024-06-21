// src/Pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % podcasts.length);
    }, 5000); // Rotate every 10 seconds

    return () => clearInterval(interval);
  }, [podcasts]);

  const fetchPodcasts = () => {
    fetch(`https://podcast-api.netlify.app/shows`)
      .then(response => response.json())
      .then(data => {
        setPodcasts(data);
      })
      .catch(error => console.error('Error fetching podcasts:', error));
  };

  return (
    <div className="home-page">
      <h2>Recommended Podcasts</h2>
      <div className="carousel">
        {podcasts.length > 0 && (
          <div className="podcast-card">
            <Link to={`/seasons/${podcasts[currentIndex].id}`}>
              <img src={podcasts[currentIndex].image} alt={podcasts[currentIndex].title} className="podcast-image" />
              <div className="podcast-info">
                <h3>{podcasts[currentIndex].title}</h3>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
