import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import "./newItem.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function NewItem(props) {
  const auth = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titre: "",
    annee: "",
    auteur: "",
    imageUrl: "",
    detail: "",
    detailUrl: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    handleValidation(e.target.id);
  };

  const handleValidation = (itemToControl) => {
    let errors = {};
    let isFormValid = true;

    if (!itemToControl || itemToControl === "titre") {
      if (!form.titre) {
        isFormValid = false;
        errors.titre = "Le titre doit être renseigné!";
      } else if (typeof form.titre !== undefined) {
        if (!form.titre.match(/^[0-9a-zA-ZÀ-ÿ\-:' ]+$/)) {
          isFormValid = false;
          errors.titre = "Ne doit contenir que des lettres ou des chiffres!";
        }
      }
    }

    if (!itemToControl || itemToControl === "annee") {
      if (!form.annee) {
        isFormValid = false;
        errors.annee = "L'année doit être renseignée!";
      } else if (typeof form.annee !== undefined) {
        if (!form.annee.match(/^[0-9]+$/)) {
          isFormValid = false;
          errors.annee = "Ne doit contenir que des chiffres sur 4 caractères!";
        }
      }
    }

    if (!itemToControl || itemToControl === "auteur") {
      if (!form.auteur) {
        isFormValid = false;
        errors.auteur = "L'auteur doit être renseigné!";
      } else if (typeof form.auteur !== undefined) {
        if (!form.auteur.match(/^[a-zA-Z\- ]+$/)) {
          isFormValid = false;
          errors.auteur = "Ne doit contenir que des lettres!";
        }
      }
    }

    // if (!itemToControl || itemToControl === "imageUrl") {
    //   if (!form.imageUrl) {
    //     isFormValid = false;
    //     errors.imageUrl = "L'url de l'image doit être renseignée!";
    //   }
    //   else if (typeof form.imageUrl !== undefined) {
    //     if (!form.imageUrl.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)) {
    //       isFormValid = false;
    //       errors.imageUrl = "Ne doit contenir que des lettres ou des chiffres!";
    //     }
    //   }
    // }

    if (!itemToControl || itemToControl === "detail") {
      if (!form.detail) {
        isFormValid = false;
        errors.detail = "Le détail doit être renseigné!";
      } else if (form.detail.length > 500) {
        isFormValid = false;
        errors.detail = "Le détail doit contenir moins de 500 caractères!";
      }
    }

    setErrors(errors);
    return isFormValid;
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log({ form });
  
    // Validation du formulaire avant l'envoi
    const isFormValid = handleValidation();
    if (!isFormValid) {
      return; // Empêche l'envoi du formulaire s'il n'est pas valide
    }
  
    const addData = async () => {
      try {
        await fetch(`https://pea-coat-sockeye.cyclic.app/api/${props.route}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
          body: JSON.stringify({
            auteur: form.auteur,
            annee: form.annee,
            titre: form.titre,
            imageUrl: form.imageUrl,
            detail: form.detail,
            detailUrl: form.detailUrl
          }),
        });
      } catch (error) {
        console.log(error.message);
      }
      navigate(`/${props.route}`);
    };
  
    addData();
  };

  return (
    <Container>
    <Form onSubmit={formSubmitHandler} className="text-white">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="titre">
          Titre : <span>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          id="titre"
          placeholder="Renseigner le titre"
          onChange={(e) => handleChange(e)}
        />
        <Form.Text style={{ color: "red" }}>{errors.titre}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="auteur">
          Auteur : <span>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          id="auteur"
          placeholder="Renseigner l'auteur"
          onChange={(e) => handleChange(e)}
        />
        <Form.Text style={{ color: "red" }}>{errors.auteur}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="annee">
          Année : <span>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          id="annee"
          placeholder="Renseigner l'année"
          onChange={(e) => handleChange(e)}
        />
        <Form.Text style={{ color: "red" }}>{errors.annee}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="imageUrl">
          Image : <span>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          id="imageUrl"
          placeholder="Renseigner l'url de l'image"
          onChange={(e) => handleChange(e)}
        />
        <Form.Text style={{ color: "red" }}>{errors.image}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="detail">
          Détails : <span>*</span>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          type="text"
          id="detail"
          placeholder="Renseigner les détails (lien youtube, résumé, etc)"
          onChange={(e) => handleChange(e)}
        />
        <Form.Text style={{ color: "red" }}>{errors.detail}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="detailUrl">
          Url de détail : <span>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          id="detailUrl"
          placeholder="Renseigner l'url amazon, youtube, etc"
          onChange={(e) => handleChange(e)}
        />
        <Form.Text style={{ color: "red" }}>{errors.detailUrl}</Form.Text>
      </Form.Group>

      

      <Button variant="primary" type="submit">
        Valider
      </Button>

    </Form>
    </Container>
  );
}

export default NewItem;
