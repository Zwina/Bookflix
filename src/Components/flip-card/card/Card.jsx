import { AuthContext } from "../../../context/auth-context";

import React, { useContext } from "react";
import "./card.css";
import "./flip-transition.css";
import Image from "react-bootstrap/esm/Image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faAmazon } from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle, faPen } from "@fortawesome/free-solid-svg-icons";

function Card2({ onClick, oeuvre, type }) {
  //console.log("type", type);
  //console.log("oeuvre", oeuvre);
  const auth = useContext(AuthContext);

  return (
    <>
      {/* {(type === "livres" || type === "films") && ( */}
      <div
        className="card2 mt-2 "
        //onClick={onClick}
      >
        <div className="card-back">
          <div className="card-content-back">
            <h3>Résumé</h3>
            <p>{oeuvre.detail}</p>
            <FontAwesomeIcon
              icon={faInfoCircle}
              size="2x"
              className="mt-2 blue-icon"
              onClick={onClick}
            />
          </div>
        </div>
        <div className="card-front">
        {auth.isLoggedIn && (
          <a href={`#/${type}/update/${oeuvre.id}`} className="icon-modify">
            <FontAwesomeIcon icon={faPen} size="2x" />
          </a>
        )}
          <Image
            src={oeuvre.imageUrl}
            style={{
              height: "14rem",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div className="card-content">
            <h3>{oeuvre.titre}</h3>
            <p>
              {oeuvre.auteur} - {oeuvre.annee}
            </p>
            {type === "livres" && (
              <div>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  size="2x"
                  className="mt-2 mx-3 blue-icon"
                  onClick={onClick}
                />
                <a
                  href={oeuvre.detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faAmazon}
                    size="2x"
                    className="mt-2 mx-3 orange-icon"
                  />
                </a>
              </div>
            )}
            {(type === "musiques" || type === "films") && (
              <div>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  size="2x"
                  className="mt-2 mx-3 blue-icon"
                  onClick={onClick}
                />
                <a
                  href={oeuvre.detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faYoutube}
                    size="2x"
                    className="mt-2 mx-3 red-icon"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default Card2;
