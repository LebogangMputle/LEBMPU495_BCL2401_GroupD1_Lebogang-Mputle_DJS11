// src/Pages/GenreDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './GenreDetails.css';  // Import the CSS file for styling

const GenreDetails = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/genre/${id}`)
            .then(response => response.json())
            .then(data => {
                setPodcasts(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching genre details:', error));
    }, [id]);

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="genre-details">
                    <h1>Podcasts in this Genre</h1>
                    <div className="podcasts">
                        {podcasts.map(podcast => (
                            <div key={podcast.id} className="podcast-card">
                                <img src={podcast.image} alt={podcast.title} className="podcast-image" />
                                <div className="podcast-info">
                                    <h3>{podcast.title}</h3>
                                    <p>{podcast.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default GenreDetails;
