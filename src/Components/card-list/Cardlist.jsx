import React from 'react'
import Carditem from '../card-item/Carditem'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './Cardlist.css'


const Cardlist = (props) => {
  const type= props.type
  //console.log(type)
  return (
    <Container>
    <Row className="d-flex justify-content-center">
        {props.oeuvres.map(oeuvreItem => (
          <Col key={oeuvreItem._id} xs={10} md={4} lg={3}>
            <Carditem key={oeuvreItem.id} oeuvre={oeuvreItem} type={type} className='col'/>
        </Col>
        ))
        }
      </Row>
    </Container>
  )
}

export default Cardlist