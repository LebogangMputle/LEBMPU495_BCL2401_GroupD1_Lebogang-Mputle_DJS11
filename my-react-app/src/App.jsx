// import React from "react";
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Library from "./Pages/Library";
import Favourites from "./Pages/Favourites";
// import Vans from "./Pages/Van/Vans";
// import VanDetail from "./Pages/Van/VanDetail";
// import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Layout from "./components/Layout";
// import AuthRequired from "./components/AuthRequired";


import "./server";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="favourites" element={<Favourites />} />
          {/* <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />
          <Route path="login" element={<Login />} /> */}

          {/* <Route element={<AuthRequired />}>
              </Route> */}
            </Route>

          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}