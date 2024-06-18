// import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="home-container">
            <h1>The Home page.</h1>
            <p>Add Music list</p>
            <Link to="vans">Find your Podcast</Link>
        </div>
    )
}