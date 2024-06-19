import { useEffect, useState } from 'react';
import './Library.css';

const Library = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPodcasts(sortedData);
      })
      .catch(error => console.error('Error fetching podcasts:', error));
  }, []);

  const sortPodcasts = (order) => {
    const sortedPodcasts = [...podcasts].sort((a, b) => {
      if (order === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setSortOrder(order);
    setPodcasts(sortedPodcasts);
  };

  return (
    <div className="library">
      <h2>Library</h2>
      <div className="sort-buttons">
        <button onClick={() => sortPodcasts('asc')}>Sort A-Z</button>
        <button onClick={() => sortPodcasts('desc')}>Sort Z-A</button>
      </div>
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
