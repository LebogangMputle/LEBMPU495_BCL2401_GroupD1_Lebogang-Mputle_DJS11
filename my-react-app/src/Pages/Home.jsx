import { useEffect, useState } from 'react';


const Home = () => {
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        fetch('https://podcast-api.netlify.app/shows')
          .then(response => response.json())
          .then(data => setPodcasts(data))
          .catch(error => console.error('Error fetching podcasts:', error));
      }, []);

      return (
        <div className="home">
          <h2>The Home page.</h2>
          <p>Add Music list</p>
          <button className="find-podcast-btn">Find your Podcast</button>
          <div>
            <h3>Podcasts</h3>
            <ul>
              {podcasts.map(podcast => (
                <li key={podcast.id}>
                  {podcast.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    };
    
    export default Home;
