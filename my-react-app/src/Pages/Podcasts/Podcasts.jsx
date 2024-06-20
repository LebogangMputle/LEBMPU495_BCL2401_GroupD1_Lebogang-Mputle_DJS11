import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Podcasts.css';

const genreMapping = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [allPodcasts, setAllPodcasts] = useState([]); // To store all podcasts initially
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetchPodcasts();
    fetchGenres();
  }, []);

  const fetchPodcasts = () => {
    fetch(`https://podcast-api.netlify.app/shows`)
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPodcasts(sortedData);
        setAllPodcasts(sortedData); // Store all podcasts
      })
      .catch(error => console.error('Error fetching podcasts:', error));
  };

  const fetchGenres = () => {
    const genresArray = Object.keys(genreMapping).map(id => ({
      id,
      name: genreMapping[id]
    }));
    setGenres(genresArray);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    filterPodcastsByGenre(event.target.value);
  };

  const filterPodcastsByGenre = (genreId) => {
    if (genreId === '') {
      setPodcasts(allPodcasts); // Show all podcasts if no genre selected
    } else {
      const filteredPodcasts = allPodcasts.filter(podcast =>
        podcast.genres && podcast.genres.includes(parseInt(genreId))
      );
      const sortedData = filteredPodcasts.sort((a, b) => a.title.localeCompare(b.title));
      setPodcasts(sortedData);
    }
  };

  const addToFavourites = (podcast) => {
    const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const isAlreadyFavourite = savedFavourites.some(fav => fav.id === podcast.id);

    if (!isAlreadyFavourite) {
      const updatedFavourites = [...savedFavourites, podcast];
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    } else {
      alert('Podcast is already in favourites');
    }
  };

  return (
    <div className="podcasts">
      <h2>Podcasts</h2>
      <div className="filter-section">
        <div className="sort-buttons">
          <button onClick={() => setPodcasts(prevPodcasts => [...prevPodcasts].sort((a, b) => a.title.localeCompare(b.title)))}>
            Sort A-Z
          </button>
          <button onClick={() => setPodcasts(prevPodcasts => [...prevPodcasts].sort((a, b) => b.title.localeCompare(a.title)))}>
            Sort Z-A
          </button>
        </div>
        {genres.length > 0 && (
          <div className="genre-filter">
            <label htmlFor="genreSelect">Filter by Genre:</label>
            <select id="genreSelect" value={selectedGenre} onChange={handleGenreChange}>
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="podcasts-list">
        {podcasts.length > 0 ? (
          podcasts.map(podcast => (
            <div key={podcast.id} className="podcast-card">
              <img src={podcast.image} alt={podcast.title} className="podcast-image" />
              <div className="podcast-info">
                <h3>{podcast.title}</h3>
                <button onClick={() => addToFavourites(podcast)}>Add to Favourites</button>
                <Link to={`/seasons/${podcast.id}`}>View Seasons</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No podcasts available</p>
        )}
      </div>
    </div>
  );
};

export default Podcasts;
