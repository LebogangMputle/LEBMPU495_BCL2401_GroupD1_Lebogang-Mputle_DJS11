// import React from 'react';
import { BrowserRouter as Router ,Route , Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Layout from './components/Layout';
// import Footer from './components/Footer';
import Home from './Pages/Home';
import Podcasts from './Pages/Podcasts/Podcasts';
import Seasons from './Pages/Seasons';
import Episodes from './Pages/Episodes';
import  Favourites  from './Pages/Favourites';
import  Search  from './Pages/Search';
import './index.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="podcasts" element={<Podcasts />} />
          <Route path="seasons/:id" element={<Seasons />} />
          <Route path="episodes/:seasonId" element={<Episodes />}
          <Route path="favourites" element={<Favourites />} />
          <Route path="search" element={<Search />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
