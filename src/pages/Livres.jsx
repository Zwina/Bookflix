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

/*let LIVRES = [
    {
        id : "1",
        auteur : "Ray Bradbury",
        annee : "1953",
        titre : "Fahrenheit 451",
        imageUrl : "https://upload.wikimedia.org/wikipedia/commons/b/bf/FAHRENHEIT_451_by_Ray_Bradbury%2C_Corgi_1957._160_pages._Cover_by_John_Richards.jpg",
        detail : "451 degrés Fahrenheit représentent la température à laquelle un livre s'enflamme et se consume.Dans cette société future où la lecture, source de questionnement et de réflexion, est considérée comme un acte antisocial, un corps spécial de pompiers est chargé de brûler tous les livres, dont la détention est interdite pour le bien collectif.Montag, le pompier pyromane, se met pourtant à rêver d'un monde différent, qui ne bannirait pas la littérature et l'imaginaire au profit d'un bonheur immédiatement consommable. Il devient dès lors un dangereux criminel, impitoyablement poursuivi par une société qui désavoue son passé."

    },
    {
      id : "2",
      auteur : "René Barjavel",
      annee : "1968",
      titre : "La nuit des temps",
      imageUrl : "data:image/jpeg;base64,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",
      detail : "Dans l'immense paysage gelé, les membres des Expéditions Polaires françaises font un relevé sous-glaciaire. Un incroyable phénomène se produit : les appareils sondeurs enregistrent un signal. Il y a un émetteur sous la glace... Que vont découvrir les savants et les techniciens venus du monde entier qui creusent la glace à la rencontre du mystère ? La nuit des temps, c'est à la fois un reportage, une épopée mêlant présent et futur, et un grand chant d'amour passionné. Traversant le drame universel comme un trait de feu, le destin d'Elea et de Païkan les emmène vers le grand mythe des amants légendaires."

  },
  {
    id : "3",
    auteur : "Robert Silverberg",
    annee : "1972",
    titre : "L'homme programmé",
    imageUrl : "data:image/jpeg;base64,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",
    detail : "Paul Macy sort juste du Centre de Réhabilitation. Bien sûr, il est encore un peu perturbé, mais très bientôt sa vie reprendra son cours normal. Un nouvel appartement, un nouveau travail l'attendent, et il ne lui faudra pas longtemps avant de se faire de nouveaux amis. Paul habite l'ancien corps de Nat Hamlin, un sculpteur de génie, mais aussi un violeur en série de la pire espèce. La personnalité, les souvenirs d'Hamlin ont été effacés de manière définitive pour faire place au passé créé de toutes pièces de Macy. La société peut désormais dormir sur ses deux oreilles. Mais quelle est donc cette voix que Paul entend de plus en plus souvent à l'intérieur de son crâne? Roman de science-fiction sombre et violent, L'homme programmé fait écho à L'oreille interne, publié à la même époque. Une nouvelle preuve de l'immense talent de l'auteur."
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
    Vous devez être connecté pour ajouter ou modifier un livre
  </Tooltip>
);

const Livres = () => {
  const auth = useContext(AuthContext);
  const [livres, setLivres] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://pea-coat-sockeye.cyclic.app/api/livres", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Erreur lors de la récupération du livre");
        }
        return res.json();
      })
      .then((res) => {
        setLivres(res.livres);
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

  //const filteredLivres = LIVRES.filter((livre) =>
  const filteredLivres = livres.filter((livre) =>
    livre.titre.toLowerCase().includes(searchField.toLowerCase())
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
              href="#/livres/new"
              className="btn-sm mt-5 mb-5 d-inline-flex align-items-center"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="w-8 h-8 text-white bg-black rounded-5 p-1 m-1"
              />{" "}
              Ajouter un livre
            </Button>
          )}
        </div>
        <div className="col-md-4 d-flex justify-content-center my-auto justify-content-center">
          <h2 className="text-white text-center">Mes Livres</h2>
        </div>
        <div className="col-md-4 d-flex justify-content-center md:justify-content-end">
          <SearchBox onChildSearchChange={OnParentSearchChange} />
        </div>
        <Cardlist oeuvres={filteredLivres} type="livres" />
      </div>
    </Container>
  );
};

export default Livres;
