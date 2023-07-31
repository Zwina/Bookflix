import React from 'react'
import Carditem from '../card-item/Carditem'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './Cardlist.css'
import Card2 from '../flip-card/card/Card';
import FlipCard from '../flip-card/FlipCard';


const Cardlist = (props) => {
  const type= props.type
  //console.log(type)
  return (
    <Container>
    <Row className="d-flex justify-content-center">
        {props.oeuvres.map(oeuvreItem => (
          <Col key={oeuvreItem._id} xs={10} md={4} lg={3} className="d-flex justify-content-center">
            {/* <Carditem key={oeuvreItem.id} oeuvre={oeuvreItem} type={type} className='col'/> */}
            <FlipCard 
            key={oeuvreItem.id} oeuvre={oeuvreItem} type={type} className='col'
            />
            {/* <Card2 key={oeuvreItem.id} oeuvre={oeuvreItem} type={type} className='col'/> */}
        </Col>
        ))
        }
      </Row>
    </Container>
  )
}

export default Cardlist