import  { useEffect, useState } from 'react';

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
      <div>
        <h3>Podcasts</h3>
        <ul>
          {podcasts.map(podcast => (
            <li key={podcast.id}>
              {podcast.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Library;
