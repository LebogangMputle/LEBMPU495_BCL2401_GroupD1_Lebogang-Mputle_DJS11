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

    const addToFavourites = (episodes) => {
        const savedFavourites = JSON.parse(localStorage.getItem('favouriteEpisode')) || [];
        const newFavourite = { episodes, seasonId };
        const isAlreadyFavourite = savedFavourites.some(
            fav => fav.episodes.episodeNumber === episodes.episodeNumber && fav.seasonId === seasonId
        );

        if (!isAlreadyFavourite) {
            const updatedFavourites = [...savedFavourites, newFavourite];
            localStorage.setItem('favouriteEpisodes', JSON.stringify(updatedFavourites));
            alert('Episode added to favourites!');
        } else {
            alert('Episode is already in favourites');
        }
    };

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="episodes-details">
                    <h3>Episodes for Season {episodes.seasonNumber}</h3>
                    <div className="episodes-list">
                        {episodes.episodes.map(episodes => (
                            <div key={episodes.episodeNumber} className="episodes">
                                <h3>Episode {episodes.episodeNumber}: {episodes.title}</h3>
                                <p>{episodes.description}</p>
                                <button onClick={() => addToFavourites(episodes)}>Add to Favourites</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Episodes;
