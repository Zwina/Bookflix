import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import './carrouselHome.css'

const YourCarousel = () => {
  return (
    <Container  style={{ marginBottom: '2rem'}}>
      <Row>
        <Col xs={12} md={4} className="mb-2 pb-2">
          <a href="#/films"><h2 className="text pb-2">Films</h2></a>
          <Carousel fade>
            <Carousel.Item interval={2000}>
              <Image
                src="/image/lavieestunlongfleuve.jpg"
                style={{ width: "18rem", height: "24rem", objectFit: "cover", objectPosition: 'center'}}
                fluid
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <Image
                src="/image/mon_nom_est_personne.jpg"
                style={{ width: "18rem", height: "24rem", objectFit: "cover", objectPosition: 'center'}}
                fluid
                text="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <Image
                src="/image/Gangs_of_New_York.jpg"
                style={{ width: "18rem", height: "24rem", objectFit: "cover", objectPosition: 'center'}}
                fluid
                text="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>

        <Col xs={12} md={4} className="mb-2 pb-2">
        <a href="#/musiques"><h2 className="text pb-2">Musiques</h2></a>
          <Carousel fade>
            <Carousel.Item interval={2000}>
              <Image
                src="/image/Cramberries.jpg"
                style={{ width: "18rem", height: "24rem", objectFit: "cover", objectPosition: 'center'}}
                fluid
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <Image
                src="/image/DaftPunk.jpg"
                style={{ width: "18rem", height: "24rem", objectFit: "cover", objectPosition: 'center'}}
                fluid
                text="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <Image
                src="/image/REM.jpg"
                style={{ width: "18rem", height: "24rem", objectFit: "cover", objectPosition: 'center'}}
                fluid
                text="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>

        <Col xs={12} md={4} className="mb-2 pb-2">
        <a href="#/livres"><h2 className="text pb-2">Livres</h2></a>
          <Carousel fade>
            <Carousel.Item interval={2000}>
              <Image
                src="/image/barjavel.jpg"
                style={{ width: "18rem", height: "24rem", objectFit: "cover", objectPosition: 'center'}}
                fluid
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <Image
                src="/image/FAHRENHEIT.jpg"
                style={{ width: "18rem", height: "24rem", objectFit: "cover", objectPosition: 'center'}}
                fluid
                text="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <Image
                src="/image/nightrunner.jpg"
                style={{ width: "18rem", height: "24rem", objectFit: "cover", objectPosition: 'center'}}
                fluid
                text="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default YourCarousel;
