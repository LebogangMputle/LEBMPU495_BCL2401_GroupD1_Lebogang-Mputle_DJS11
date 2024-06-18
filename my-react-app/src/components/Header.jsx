import { Link, NavLink } from "react-router-dom"
// import imageUrl from "../assets/images/avatar-icon.png"

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    function fakeLogOut() {
        localStorage.removeItem("loggedin")
    }

    return (
        <header>
            <Link className="site-logo" to="/">Podacast APP</Link>
            <nav>
                <NavLink
                    to="/"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/Library"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Library
                </NavLink>
                <NavLink
                    to="/Favourites"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Favourites
                </NavLink>
                <NavLink
                    to="/Search"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Search
                </NavLink>
                {/* <Link to="login" className="login-link">
                    <img
                        // src={imageUrl}
                        className="login-icon"
                    />
                </Link> */}
                <button onClick={fakeLogOut}>X</button>
            </nav>
        </header>
    )
}