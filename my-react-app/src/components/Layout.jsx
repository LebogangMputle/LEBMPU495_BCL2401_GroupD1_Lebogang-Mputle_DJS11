// import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const showFooter = location.pathname === '/' || location.pathname === '/podcasts' || location.pathname === '/favourites' || location.pathname === '/search';

  return (
    <>
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      {showFooter && <Footer />} </>
  );
};

export default Layout;
