import React from "react";
import "./card.css";
import "./flip-transition.css";
import Image from "react-bootstrap/esm/Image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function Card2({ onClick, oeuvre, type }) {
  console.log("type", type);
  console.log("oeuvre", oeuvre);

  return (
    <>

{type === "musiques" && (
         <div className="card3 mt-2">
         <div className="card-front">
           <Image
             src={oeuvre.imageUrl}
             style={{
               height: "14rem",
               objectFit: "cover",
               objectPosition: "center",
             }}
           />
           <div className="card-content3">
             <h3>{oeuvre.titre}</h3>
             <p>
               {oeuvre.auteur} - {oeuvre.annee}
             </p>
             <a
            href={oeuvre.detail}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYoutube} size="2x" className="mt-4"/>
          </a>
           </div>
         </div>
       </div>
        )}

 {(type === "livres" || type === "films") && (
    <div className="card2 mt-2 " onClick={onClick}>
      <div className="card-back">
          <div className="card-content-back">
          <h3>Résumé</h3>
          <p>{oeuvre.detail}</p>
        </div>
      </div>
      <div className="card-front">
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
          
          <FontAwesomeIcon icon={faInfoCircle} size="2x" className="mt-2 blue-icon"/>
       
        </div>
      </div>
    </div>

    )}
</>
  );
}

export default Card2;
