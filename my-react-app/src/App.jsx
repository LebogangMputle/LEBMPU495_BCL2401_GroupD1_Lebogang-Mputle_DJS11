// import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Library from './Pages/Library';
import Favourites from './Pages/Favourites';
import Search from './Pages/Search';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/library" component={Library} />
            <Route path="/favourites" component={Favourites} />
            <Route path="/search" component={Search} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
