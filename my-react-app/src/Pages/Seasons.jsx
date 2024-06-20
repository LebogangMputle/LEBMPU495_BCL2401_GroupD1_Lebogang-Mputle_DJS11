// import React from 'react'

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './Seasons.css';

const Seasons = () => {
    const [podcasts, setPodcasts] = useState(null);
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    // const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
          .then(response => response.json())
          .then(data =>{ 
                setPodcasts(data) 
                setLoading(false)
            })
          .catch(error => console.error('Error fetching podcasts:', error));
      }, [id])

    //   const handleSeasonsClick = () => {
    //     // alert('Viewing Seasons')
    //     navigate(`/seasons/${id}/season/`);
    //   };

      return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="podcast-details">
                    <h1>{podcasts.title}</h1>
                    <img src={podcasts.image} alt={podcasts.title} className="podcast-image" />
                    <p className="podcast-description">{podcasts.description}</p>
                    <div className="seasons">
                        {podcasts.seasons.map(season => (
                            <div key={season.seasonNumber} className="season">
                                <h2> {season.title}</h2>
                                <div className="episodes">
                                    {season.episodes.map(episode => (
                                        <div key={episode.title.image} className="episode">
                                            <h3>    
                                                <div to={`/episodes/${episode.file}`}>
                                                    <audio controls>
                                                        <source src={`${episode.file}`}></source>
                                                    </audio>
                                                    Episode {episode.discription}: {episode.title}
                                                </div>
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
