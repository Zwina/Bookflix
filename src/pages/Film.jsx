import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Cardlist from '../Components/card-list/Cardlist'
import SearchBox from '../Components/search-box/SearchBox';

import 'bootstrap/dist/css/bootstrap.min.css';

/*let FILMS = [
    {
        id : "1",
        auteur : "Tonino Valerii",
        annee : "1973",
        titre : "Mon nom est Personne",
        imageUrl : "https://www.filmspourenfants.net/wp-content/uploads/2020/09/mon-nom-est-personne-a-366x500.jpg",
        detail : "blabla blabla blabla blabla"

    },
    {
      id : "2",
      auteur : "Enzo Barboni",
      annee : "1970",
      titre : "On l'appelle Trinita",
      imageUrl : "https://www.rueducine.com/wp-content/uploads/2013/08/rueducine.com-on-l-appelle-trinita-1970.jpg"

  },
  {
    id : "3",
    auteur : "Enzo Barboni",
    annee : "1971",
    titre : "On continue à l'appeler Trinita",
    imageUrl : "https://www.intemporel.com/wp-content/uploads/89336.jpg"

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

const Film = () => {
  
  const [films, setFilms] = useState([])
  const [searchField, setSearchField] = useState('')
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://pea-coat-sockeye.cyclic.app/api/films', {
      method: "GET",
      headers:{
        'Content-Type' : 'application/json'
      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201){
        throw new Error('Erreur lors de la récupération du film')
      }
      return res.json()
    }).then(res => {
      setFilms(res.films)
    }).catch(error => {
      console.log(error)
      setError(error.message)
    })
  }, [])




  const OnParentSearchChange = event => {
    // alert ('');
    //console.log(event.target.value);
    setSearchField(event.target.value);
  }

  //const filteredFilms = FILMS.filter((film) => 
  const filteredFilms = films.filter((film) => 
    film.titre.toLowerCase().includes(searchField.toLowerCase())
  );
  
  

  
  return (
    <Container fluid>
      <div className="row">
          <div className="col-md-4 d-flex justify-content-center md:justify-content-start">
            <Button
              variant="warning"
              href="#/films/new"
              className="btn-sm mt-5 mb-5 d-inline-flex align-items-center"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="w-8 h-8 text-white bg-black rounded-5 p-1 m-1"
              />{" "}
              Ajouter un film
            </Button>
          </div>
          <div className="col-md-4 d-flex justify-content-center my-auto justify-content-center">
           <h2 className="text-white">Mes Films</h2>
          </div>
          <div className="col-md-4 d-flex justify-content-center md:justify-content-end">
            <SearchBox onChildSearchChange={OnParentSearchChange} />
          </div>
        <Cardlist oeuvres={filteredFilms} type='films'/>
      </div>
    </Container>
  )
}

export default Film