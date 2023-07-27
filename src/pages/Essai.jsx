import React from "react";
import CarouselFade from "../Components/carrouselHome/carrouselHome";
import Container from "react-bootstrap/esm/Container";

function Essai() {
  return (
    <Container>
      <h1 className="mb-5 mt-5">BOOKFLIX</h1>
      <h4 className="mb-5 mt-5 text-secondary">
        Explorez notre bibliothèque de films, livres et musiques soigneusement
        sélectionnés. Plongez-vous dans une collection diversifiée comprenant
        des classiques intemporels, des œuvres contemporaines captivantes et des
        trésors cachés.
      </h4>
      <CarouselFade />
    </Container>
  );
}

export default Essai;
