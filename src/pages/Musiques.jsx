import { AuthContext } from "../context/auth-context";

import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Cardlist from "../Components/card-list/Cardlist";
import SearchBox from "../Components/search-box/SearchBox";

import "bootstrap/dist/css/bootstrap.min.css";

/*let MUSIQUES = [
    {
        id : "1",
        auteur : "Daft Punk",
        annee : "2013",
        titre : "Get lucky",
        imageUrl : "https://m.media-amazon.com/images/I/61cjEm5meDL._SL1500_.jpg",
        detail : "https://www.youtube.com/watch?v=5NV6Rdv1a3I"
    },
    {
        id : "2",
        auteur : "R.E.M.",
        annee : "1991",
        titre : "Losing my religion",
        imageUrl : "https://www.christianismeaujourdhui.info/wp-content/uploads/sites/3/2022/08/REM_Losing-my-Religion_image-971x0-c-default.jpg"

    },
    {
        id : "3",
        auteur : "The Cramberries",
        annee : "1994",
        titre : "Zombie",
        imageUrl : "https://m.media-amazon.com/images/I/51wZc27VVOL._SX355_.jpg"

    },
    {
      id : "4",
      auteur : "Daft Punk",
      annee : "2013",
      titre : "Get lucky",
      imageUrl : "https://m.media-amazon.com/images/I/61cjEm5meDL._SL1500_.jpg"
    },
    {
      id : "5",
      auteur : "Daft Punk",
      annee : "2013",
      titre : "Get lucky",
      imageUrl : "https://m.media-amazon.com/images/I/61cjEm5meDL._SL1500_.jpg"
    },
    {
      id : "6",
      auteur : "Daft Punk",
      annee : "2013",
      titre : "Get lucky",
      imageUrl : "https://m.media-amazon.com/images/I/61cjEm5meDL._SL1500_.jpg"
    },
    {
      id : "7",
      auteur : "Daft Punk",
      annee : "2013",
      titre : "Get lucky",
      imageUrl : "https://m.media-amazon.com/images/I/61cjEm5meDL._SL1500_.jpg"
    },
    {
      id : "8",
      auteur : "Daft Punk",
      annee : "2013",
      titre : "Get lucky",
      imageUrl : "https://m.media-amazon.com/images/I/61cjEm5meDL._SL1500_.jpg"
    }

]*/

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Vous devez être connecté pour ajouter ou modifier une musique
  </Tooltip>
);

const Musiques = () => {
  const auth = useContext(AuthContext);
  const [musiques, setMusiques] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://pea-coat-sockeye.cyclic.app/api/musiques", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Erreur lors de la récupération de la musique");
        }
        return res.json();
      })
      .then((res) => {
        setMusiques(res.musiques);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }, []);

  const OnParentSearchChange = (event) => {
    // alert ('');
    //console.log(event.target.value);
    setSearchField(event.target.value);
  };

  //const filteredMusiques = MUSIQUES.filter((musique) =>
  const filteredMusiques = musiques.filter((musique) =>
    musique.titre.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <Container fluid>
      <div className="row">
        <div className="col-md-4 d-flex justify-content-center md:justify-content-start">
          {!auth.isLoggedIn && (
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Button
                variant="warning"
                href="#/login"
                className="btn-sm mt-5 mb-5 d-inline-flex align-items-center"
              >
                Connexion
              </Button>
            </OverlayTrigger>
          )}

          {auth.isLoggedIn && (
            <Button
              variant="warning"
              href="#/musiques/new"
              className="btn-sm mt-5 mb-5 d-inline-flex align-items-center"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="w-8 h-8 text-white bg-black rounded-5 p-1 m-1"
              />{" "}
              Ajouter une musique
            </Button>
          )}
        </div>
        <div className="col-md-4 d-flex justify-content-center my-auto justify-content-center">
          <h2 className="text-white">Mes Musiques</h2>
        </div>
        <div className="col-md-4 d-flex justify-content-center md:justify-content-end">
          <SearchBox onChildSearchChange={OnParentSearchChange} />
        </div>
        <Cardlist oeuvres={filteredMusiques} type="musiques" />
      </div>
    </Container>
  );
};

export default Musiques;
