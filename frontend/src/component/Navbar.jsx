import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram,faVideo,faSignOut, faSignInAlt, faUserPlus, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import './Projects.css';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout()
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          <img src="..\assets\logo.png" className="navbar-logo" alt="Logo" width="220" height="70" />
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link link-secondary" to="/">
                <FontAwesomeIcon icon={faHome} className="me-1" />Accueil
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link link-secondary" to="/projects">
                  <FontAwesomeIcon icon={faProjectDiagram} className="me-1" />Projets
                </NavLink>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link link-secondary" to="/mes-scenes">
                  <FontAwesomeIcon icon={faVideo} className="me-1" />Mes scenes
                </NavLink>
              </li>
            )}
          </ul>
          {!user && (
            <div className="navbar-buttons">
              <NavLink to="/Login" className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faSignInAlt} className="me-1" />Se connecter
              </NavLink>
              <NavLink to="/Signup" className="btn btn-outline-primary ms-2">
                <FontAwesomeIcon icon={faUserPlus} className="me-1" />S'inscrire
              </NavLink>
            </div>
          )}

          {user && (
            <div>
              <span className='textNav'>  
              <FontAwesomeIcon icon={faUser} className="me-1" />{user.email}
              </span>
              <button onClick={handleClick} className="btn btn-outline-primary ms-2">
                <FontAwesomeIcon icon={faSignOut} className="me-1" />Log out</button>
            </div>
          )}


        </div>
      </div>
    </nav>
  );
}

export default Navbar;
