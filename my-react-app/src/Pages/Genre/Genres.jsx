import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Genre.css'; // Import the CSS file for styling

const Genres = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://podcast-api.netlify.app/genres')
            .then(response => response.json())
            .then(data => {
                setGenres(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching genres:', error));
    }, []);

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="genres-list">
                    <h1>Genres</h1>
                    <ul>
                        {genres.map(genre => (
                            <li key={genre.id}>
                                <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Genres;
