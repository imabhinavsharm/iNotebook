import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from '../context/notes/auth/authContext'
const Navbar = () => {
    const context = useContext(AuthContext)
    const { isauthenticated, setisauthenticated } = context
    let location = useLocation()
    const logout = () => {
        setisauthenticated(false)
        localStorage.clear()
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">NoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/Home" ? "active" : ""}`} to="/Home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                            {
                                isauthenticated === true
                                    ?
                                    <Link type="button" to="/Login" onClick={logout} className="btn btn-outline-primary">Logout</Link>
                                    :
                                    <>
                                        <Link type="button" to="/Login" className="btn btn-outline-primary mx-2">Login</Link>
                                        <Link type="button" to="/Signup" className="btn btn-outline-primary mx-2">Sign up</Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
