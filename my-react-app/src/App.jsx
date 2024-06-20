// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Podcasts from './Pages/Podcasts/Podcasts';
import Seasons from './Pages/Seasons';
import Episodes from './Pages/Episode/Episodes'; 
import Favourites from './Pages/Favourites';
import Search from './Pages/Search';
import Genres from './Pages/Genre/Genres'; 
import GenreDetails from './Pages/Genre/GenreDetails'; 
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="podcasts" element={<Podcasts />} />
          <Route path="seasons/:id" element={<Seasons />} />
          <Route path="seasons/:id/season/:seasonNumber" element={<Seasons />} />
          <Route path="episodes/:seasonId" element={<Episodes />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="search" element={<Search />} />
          <Route path="genres" element={<Genres />} />  
          <Route path="genre/:id" element={<GenreDetails />} />  
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
