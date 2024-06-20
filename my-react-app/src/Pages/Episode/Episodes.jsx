// src/Pages/Episodes.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './Episodes.css';  // Import the CSS file for styling

const Episodes = () => {
    const [episodes, setEpisodes] = useState(null);
    const [loading, setLoading] = useState(true);
    const { seasonId } = useParams();

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/season/${seasonId}`)
            .then(response => response.json())
            .then(data => {
                setEpisodes(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching episodes:', error));
    }, [seasonId]);

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="episodes-details">
                    <h1>Episodes for Season {episodes.seasonNumber}</h1>
                    <div className="episodes-list">
                        {episodes.episodes.map(episode => (
                            <div key={episode.episodeNumber} className="episode">
                                <h3>Episode {episode.episodeNumber}: {episode.title}</h3>
                                <p>{episode.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Episodes;
