// import React from 'react'

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Seasons = () => {
    const [podcasts, setPodcasts] = useState(null);
    const [loading, setLoading] = useState(true)
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
          .then(response => response.json())
          .then(data => { setPodcasts(data) 
                          setLoading(false)
            })
          .catch(error => console.error('Error fetching podcasts:', error));
      }, [id])
      console.log(podcasts)
      return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="podcast-details">
                    <h1>{podcasts.title}</h1>
                    <img src={podcasts.image} alt={podcasts.title} className="podcast-image" />
                </div>
            )}
        </>
    );
};

export default Seasons;
