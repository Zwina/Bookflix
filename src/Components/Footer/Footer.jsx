import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook, faFilm, faMusic, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

function Footer() {
  const auth = useContext(AuthContext);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid>
          {/* <Navbar.Brand href="/">
            <img
              alt="icon"
              src="/image/icon.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            BookFlix | Marjorie Kehil | Tous droits réservés.
          </Navbar.Brand> */}
          <Nav >
            <Nav.Link href="/" exact="true">
            BookFlix (2023) - Marjorie Kehil - Tous droits réservés.
            </Nav.Link>
            <Nav.Link href="/" exact="true">
              Mentions Légales 
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Footer;