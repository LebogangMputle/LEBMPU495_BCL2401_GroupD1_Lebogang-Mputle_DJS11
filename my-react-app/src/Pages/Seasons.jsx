// src/Pages/Seasons.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './Seasons.css';

const Seasons = () => {
    const [podcast, setPodcast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [seasonsVisibility, setSeasonsVisibility] = useState({}); // State to manage visibility of each season
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
          .then(response => response.json())
          .then(data => { 
                setPodcast(data); 
                setLoading(false);
                // Initialize seasonsVisibility state based on the number of seasons
                const initialVisibility = {};
                data.seasons.forEach(season => {
                    initialVisibility[season.seasonNumber] = false; // Initially hide all seasons
                });
                setSeasonsVisibility(initialVisibility);
            })
          .catch(error => console.error('Error fetching podcasts:', error));
    }, [id]);

    const toggleSeason = (seasonNumber) => {
        setSeasonsVisibility(prev => ({
            ...prev,
            [seasonNumber]: !prev[seasonNumber] // Toggle the visibility of the clicked season
        }));
    };

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="podcast-details">
                    <Link to={`/podcasts/`} className="back-link">Back to Podcast</Link>
                    <h1>{podcast.title}</h1>
                    <img src={podcast.image} alt={podcast.title} className="podcast-image" />
                    <p className="podcast-description">{podcast.description}</p>
                    
                    {podcast.seasons.map(season => (
                        <div key={season.seasonNumber} className="season">
                            <h2 onClick={() => toggleSeason(season.seasonNumber)} className="season-title">
                                {season.title}
                            </h2>
                            {seasonsVisibility[season.seasonNumber] && (
                                                                <div className="season-content">
                                                                {season.seasons && ( // Render season-specific image if available
                                                                    <img src={season.image} alt={`Season ${season.seasonNumber}`} className="season-image" />
                                                                )}
                                <div className="episodes">
                                    {season.episodes.map(episode => (
                                        <div key={episode.title} className="episode">
                                            <h3>
                                                <audio controls className="audio-player">
                                                    <source src={episode.file} type="audio/mpeg" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                                 {episode.title}
                                            </h3>
                                            <p>{episode.description}</p>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Seasons;
