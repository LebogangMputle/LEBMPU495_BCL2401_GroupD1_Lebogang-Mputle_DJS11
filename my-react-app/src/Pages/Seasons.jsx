// import React from 'react'

import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './Seasons.css';

const Seasons = () => {
    const [podcasts, setPodcasts] = useState(null);
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
          .then(response => response.json())
          .then(data =>
             { setPodcasts(data) 
               setLoading(false)
            })
          .catch(error => console.error('Error fetching podcasts:', error));
      }, [id])

      const handleSeasonsClick = () => {
        navigate(`/seasons/${id}`);
      };

      return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="podcast-details">
                    <h1>{podcasts.title}</h1>
                    <img src={podcasts.image} alt={podcasts.title} className="podcast-image" />
                    <p className="podcast-description">{podcasts.description}</p>
                    {id === '5968' && (
                        <button onClick={handleSeasonsClick} className="seasons-button">
                            View Seasons
                        </button>
                    )}
                    <div className="seasons">
                        {podcasts ?.shows?.map(seasons => (
                            <div key={seasons.seasonsNumber} className="seasons">
                                <h2>Seasons {seasons.seasonsNumber}</h2>
                                <div className="episodes">
                                    {seasons.episodes.map(episode => (
                                        <div key={episode.episodeNumber} className="episode">
                                            <h3>
                                                <Link to={`/episodes/${seasons.seasonsNumber}`}>
                                                    Episode {episode.episodeNumber}: {episode.title}
                                                </Link>
                                            </h3>
                                            <p>{episode.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Seasons;
