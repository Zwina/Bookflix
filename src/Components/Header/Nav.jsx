import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook, faFilm, faMusic, faSignInAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'

import "bootstrap/dist/css/bootstrap.min.css";
import "./banner.css";

function NavOne() {
  const auth = useContext(AuthContext);
  return (
    <Navbar  expand="lg" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              alt="icon"
              src="/image/logo.jpg"
              width="35"
              height="35"
              className="d-inline-block align-top rounded-5"
            />{" "}
            BookFlix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav >
            <Nav.Link href="/" exact="true">
              <FontAwesomeIcon icon={faHome} className="w-8 h-8 text-white" />{' '}Accueil 
            </Nav.Link>

            <Nav.Link href="#/films">
            <FontAwesomeIcon icon={faFilm} className="w-8 h-8 text-white" />{' '}Films
            </Nav.Link>

            <Nav.Link href="#/musiques">
            <FontAwesomeIcon icon={faMusic} className="w-8 h-8 text-white" />{' '}Musiques
            </Nav.Link>
            <Nav.Link href="#/livres" >
            <FontAwesomeIcon icon={faBook} className="w-8 h-8 text-white" />{' '}Livres
            </Nav.Link>
            
            {!auth.isLoggedIn && (
              <Nav.Link className="nav-link" href="#/login">
                <FontAwesomeIcon icon={faUser} className="w-8 h-8 text-white" />{' '}Se connecter
              </Nav.Link>
            )}

            {/* {!auth.isLoggedIn && (
              <Nav.Link className="nav-link" href="/signup">
                <FontAwesomeIcon icon={faSignOutAlt} className="w-8 h-8 text-white" />{' '}Signup
              </Nav.Link>
            )} */}
            {auth.isLoggedIn && (
              <button className="nav-link" onClick={auth.logout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="w-8 h-8 text-white" />{' '}Logout
              </button>
            )}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default NavOne;