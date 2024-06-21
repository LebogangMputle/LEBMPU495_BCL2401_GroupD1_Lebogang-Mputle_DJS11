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
  const [loading, setLoading] = useState(true); // Loading state
  const [sortDirection, setSortDirection] = useState('asc'); // State for sorting direction

  useEffect(() => {
    fetchPodcasts();
    fetchGenres();
  }, []);

  const fetchPodcasts = () => {
    setLoading(true); // Set loading to true when fetching data
    fetch(`https://podcast-api.netlify.app/shows`)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(podcast => ({
          ...podcast,
          genres: podcast.genres.map(genreId => genreMapping[genreId]).join(', '), // Map genre IDs to titles
          updated: formatReadableDate(podcast.updated), // Format the date here
          seasons: podcast.seasons.length, // Number of seasons
          isFavorite: false // Default value for isFavorite
        }));
        const sortedData = sortPodcasts(formattedData, sortDirection);
        setPodcasts(sortedData);
        setAllPodcasts(sortedData); // Store all podcasts
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching podcasts:', error);
        setLoading(false); // Ensure loading state is set to false in case of error
      });
  };

  const fetchGenres = () => {
    const genresArray = Object.keys(genreMapping).map(id => ({
      id,
      name: genreMapping[id]
    }));
    setGenres(genresArray);
  };

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    filterPodcasts(genreId, searchQuery);
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterPodcasts(selectedGenre, query);
  };

  const filterPodcasts = (genreId, query) => {
    let filteredData = [...allPodcasts]; // Create a copy of allPodcasts

    if (genreId !== '') {
      filteredData = filteredData.filter(podcast =>
        podcast.genres.toLowerCase().includes(genreMapping[genreId].toLowerCase())
      );
    }

    if (query.trim() !== '') {
      const lowercaseQuery = query.trim().toLowerCase();
      filteredData = filteredData.filter(podcast =>
        podcast.title.toLowerCase().includes(lowercaseQuery)
      );
    }

    const sortedData = sortPodcasts(filteredData, sortDirection);
    setPodcasts(sortedData);
  };

  const sortPodcasts = (data, direction) => {
    const sortedData = [...data];
    if (direction === 'asc') {
      return sortedData.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return sortedData.sort((a, b) => b.title.localeCompare(a.title));
    }
  };

  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    const sortedData = sortPodcasts(podcasts, newDirection);
    setPodcasts(sortedData);
  };

  const addToFavourites = (podcast) => {
    const updatedPodcasts = podcasts.map(p => {
      if (p.id === podcast.id) {
        return { ...p, isFavorite: !p.isFavorite };
      }
      return p;
    });
    setPodcasts(updatedPodcasts);

    const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const isAlreadyFavourite = savedFavourites.some(fav => fav.id === podcast.id);

    if (!isAlreadyFavourite) {
      const updatedFavourites = [...savedFavourites, podcast];
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    } else {
      const updatedFavourites = savedFavourites.filter(fav => fav.id !== podcast.id);
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    }
  };

  // Function to format date into human-readable format
  const formatReadableDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="podcasts">
      <h2 className='podcast-title'>Podcasts</h2>
      <div className="filter-section">
        <div className="sort-buttons">
          <button onClick={toggleSortDirection}>
            {sortDirection === 'asc' ? 'Sort A-Z' : 'Sort Z-A'}
          </button>
        </div>
        {genres.length > 0 && (
          <div className="genre-filter">
            <label htmlFor="genreSelect"></label>
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
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : podcasts.length > 0 ? (
          podcasts.map(podcast => (
            <Link key={podcast.id} to={`/seasons/${podcast.id}`} className="podcast-card">
              <div>
                <img src={podcast.image} alt={podcast.title} className="podcast-image" />
                <div className="podcast-info">
                  <h3>{podcast.title}</h3>
                  <p className="podcast-genres">{podcast.genres}</p>
                  <p className="podcast-seasons">Seasons: {podcast.seasons}</p>
                  <p className="podcast-updated">Last Updated: {podcast.updated}</p>
                  <button className={podcast.isFavorite ? 'favorite-btn active' : 'favorite-btn'} onClick={(e) => {
                    e.preventDefault();
                    addToFavourites(podcast);
                  }}>
                    ❤️
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading podcasts...</p>
        )}
      </div>
    </div>
  );
};

export default Podcasts;
