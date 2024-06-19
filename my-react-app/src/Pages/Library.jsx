import { useEffect, useState } from 'react';
import './Library.css'; // Ensure you have a Library.css file for styling

const Library = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => setPodcasts(data))
      .catch(error => console.error('Error fetching podcasts:', error));
  }, []);

  return (
    <div className="library">
      <h2>Library</h2>
      <div className="podcasts">
        {podcasts.map(podcast => (
          <div key={podcast.id} className="podcast-card">
            <img src={podcast.image} alt={podcast.title} className="podcast-image" />
            <div className="podcast-info">
              <h3>{podcast.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
