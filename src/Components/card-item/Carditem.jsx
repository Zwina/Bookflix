import React from "react";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Card from "react-bootstrap/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faAmazon } from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import "./Carditem.css";

const Carditem = (props) => {
  const type = props.type;
  console.log(type);

  let popover = null;

  popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Détails</Popover.Header>
      <Popover.Body>{props.oeuvre.detail}</Popover.Body>
    </Popover>
  );

  return (
    <div>
      <Card bg="dark" text="light" style={{ height: "28rem" }} className="mb-2">
        <Card.Img
          variant="top"
          src={props.oeuvre.imageUrl}
          style={{
            height: "14rem",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <Card.Body>
          <Card.Title>{props.oeuvre.titre}</Card.Title>
          <Card.Text>
            {props.oeuvre.auteur} - {props.oeuvre.annee}
          </Card.Text>
        </Card.Body>

        {type === "musiques" && (
          <a
            href={props.oeuvre.detail}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
        )}

        {type === "livres" && (
          <OverlayTrigger trigger="hover" placement="top" overlay={popover}>
            <FontAwesomeIcon icon={faInfoCircle} size="2x" className="blue-icon" />
          </OverlayTrigger>
        )}

        {type === "films" && (
          <OverlayTrigger trigger="hover" placement="top" overlay={popover}>
            <FontAwesomeIcon
              icon={faInfoCircle}
              size="2x"
              className="blue-icon"
            />
          </OverlayTrigger>
        )}
      </Card>
    </div>
  );
};

export default Carditem;
