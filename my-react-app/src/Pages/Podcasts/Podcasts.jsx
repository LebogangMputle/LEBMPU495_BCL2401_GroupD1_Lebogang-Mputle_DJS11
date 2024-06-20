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
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPodcasts();
    fetchGenres();
  }, []);

  const fetchPodcasts = () => {
    fetch(`https://podcast-api.netlify.app/shows`)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(podcast => ({
          ...podcast,
          genres: podcast.genres.map(genres => genreMapping[genres]).join(', '), // Map genre IDs to titles
          updated: formatReadableDate(podcast.updated) // Format the date here
        }));
        const sortedData = formattedData.sort((a, b) => a.title.localeCompare(b.title));
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

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterPodcastsByGenre(selectedGenre, event.target.value);
  };

  const filterPodcastsByGenre = (genreId, query = '') => {
    let filteredData = allPodcasts;

    if (genreId !== '') {
      filteredData = filteredData.filter(podcast =>
        podcast.genres && podcast.genres.includes(parseInt(genreId))
      );
    }

    if (query.trim() !== '') {
      const lowercaseQuery = query.trim().toLowerCase();
      filteredData = filteredData.filter(podcast =>
        podcast.title.toLowerCase().includes(lowercaseQuery)
      );
    }

    const sortedData = filteredData.sort((a, b) => a.title.localeCompare(b.title));
    setPodcasts(sortedData);
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

  // Function to format date into human-readable format
  const formatReadableDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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

        <div className="search">
          <input
            type="text"
            placeholder="Search podcasts..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>

      <div className="podcasts-list">
        {podcasts.length > 0 ? (
          podcasts.map(podcast => (
            <Link key={podcast.id} to={`/seasons/${podcast.id}`} className="podcast-card">
              <div>
                <img src={podcast.image} alt={podcast.title} className="podcast-image" />
                <div className="podcast-info">
                  <h3>{podcast.title}</h3>
                  <p className="podcast-seasons">Genres: {podcast.genres}</p>
                  <p className="podcast-seasons">Seasons: {podcast.seasons}</p>
                  <p className="podcast-seasons">Last Updated: {podcast.updated}</p>
                  <button onClick={(e) => {
                    e.preventDefault();
                    addToFavourites(podcast);
                  }}>
                    Add to Favourites
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No podcasts available</p>
        )}
      </div>
    </div>
  );
};

export default Podcasts;
