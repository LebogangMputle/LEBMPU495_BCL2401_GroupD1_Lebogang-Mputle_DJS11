// src/Pages/Seasons.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './Seasons.css';

const Seasons = () => {
    const [podcast, setPodcast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSeasons, setShowSeasons] = useState(false); // State to toggle seasons visibility
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
          .then(response => response.json())
          .then(data => { 
                setPodcast(data); 
                setLoading(false);
            })
          .catch(error => console.error('Error fetching podcasts:', error));
    }, [id]);

    const handleSeasonsClick = () => {
        setShowSeasons(prev => !prev); // Toggle showSeasons between true and false
    };

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="podcast-details">
                    <h1>{podcast.title}</h1>
                    <img src={podcast.image} alt={podcast.title} className="podcast-image" />
                    <p className="podcast-description">{podcast.description}</p>
                    <button onClick={handleSeasonsClick} className={`seasons-button ${showSeasons ? 'active' : ''}`}>
                        {showSeasons ? 'Hide Seasons' : 'View Seasons'}
                    </button>
                    {showSeasons && (
                        <div className="seasons">
                            {podcast.seasons.map(season => (
                                <div key={season.seasonNumber} className="season">
                                    <h2>{season.title}</h2>
                                    <div className="episodes">
                                        {season.episodes.map(episode => (
                                            <div key={episode.title} className="episode">
                                                <h3>
                                                    <audio controls className="audio-player">
                                                        <source src={episode.file} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                    Episode {episode.title}
                                                </h3>
                                                <p>{episode.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Seasons;
