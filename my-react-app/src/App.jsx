// import React from 'react';
import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Library from './Pages/Library';
import Favourites from './Pages/Favourites';
import Search from './Pages/Search';
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" component={Home} />
            <Route path="/library" component={Library} />
            <Route path="/favourites" component={Favourites} />
            <Route path="/search" component={Search} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
