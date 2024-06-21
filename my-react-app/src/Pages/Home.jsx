import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

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

const Home = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allPodcasts, setAllPodcasts] = useState([]); // To store all podcasts initially
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchPodcasts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % podcasts.length);
    }, 10000); // Rotate every 10 seconds

    return () => clearInterval(interval);
  }, [podcasts]);

  const fetchPodcasts = () => {
    fetch(`https://podcast-api.netlify.app/`)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(podcast => ({
          ...podcast,
          genres: podcast.genres.map(genreId => genreMapping[genreId]).join(', '), // Map genre IDs to titles
          updated: formatReadableDate(podcast.updated), // Format the date here
          seasons: podcast.seasons.length // Number of seasons
        }));
        const sortedData = formattedData.sort((a, b) => a.title.localeCompare(b.title));
        setPodcasts(sortedData);
        setAllPodcasts(sortedData); // Store all podcasts
        setLoading(false); // Update loading state once data is fetched
      })
      .catch(error => {
        console.error('Error fetching podcasts:', error);
        setLoading(false); // Ensure loading state is set to false in case of error
      });
  };

  // Function to format date into human-readable format
  const formatReadableDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="home-page">
      <h2>Recommended Podcasts</h2>
      {loading ? ( // Conditional rendering based on loading state
        <p>Loading...</p>
      ) : (
        <div className="carousel">
          {podcasts.length > 0 && (
            <div className="podcast-card">
              <Link to={`/seasons/${podcasts[currentIndex].id}`} className="podcast-link">
                <img src={podcasts[currentIndex].image} alt={podcasts[currentIndex].title} className="podcast-image" />
                <div className="podcast-info">
                  <h3>{podcasts[currentIndex].title}</h3>
                  <p className="podcast-details">
                    {podcasts[currentIndex].genres}<br />
                    Last Updated: {podcasts[currentIndex].updated}
                  </p>
                </div>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
