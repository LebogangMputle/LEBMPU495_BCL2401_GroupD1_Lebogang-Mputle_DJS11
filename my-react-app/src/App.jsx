//import React from "react"
import Home from "./Pages/Home"
import Library from "./Pages/Library"
import Favourites from "./Pages/Favourites"
import Layout from "./components/Layouts"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="library" element={<Library />} />
        <Route path="favourites" element={<Favourites/>} />
      </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
