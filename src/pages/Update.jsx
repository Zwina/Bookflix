import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import "./update.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function UpdateItem(props) {
  const auth = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { itemId } = useParams();

  const [form, setForm] = useState({
    titre: "",
    annee: "",
    auteur: "",
    imageUrl: "",
    detail: "",
    detailUrl: "",
  });

  // Remplir le formulaire avec les données de l'élément à mettre à jour
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(
          `https://pea-coat-sockeye.cyclic.app/api/${props.route}/${itemId}`
        );
        const data = await response.json();
        {(props.route === "livres") && (setForm(data.livre))}
        {(props.route === "films") && (setForm(data.film))}
        {(props.route === "musiques") && (setForm(data.musique))}
         // Remplir le formulaire avec les données reçues
        //console.log(form)
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItemData();
  }, [itemId, props.route]);

  useEffect(() => {
    console.log("form", form);
  }, [form]);

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
        await fetch(`https://pea-coat-sockeye.cyclic.app/api/${props.route}/${itemId}`, {
          method: "PATCH",
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
          value={form.titre || ''}
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
          value={form.auteur || ''}
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
          value={form.annee || ''}
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
          value={form.imageUrl || ''}
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
          value={form.detail || ''}
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
          value={form.detailUrl || ''}
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

export default UpdateItem;






// import React, {useEffect, useState} from "react";
// import { useForm } from "react-hook-form";
 
// import "./update.css";
 
// const UpdateItem = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
 
//   const onSubmit = (data) => {
//     alert(JSON.stringify(data));
//   }; // your form submit function which will invoke after successful validation
 
//   console.log(watch("firstName")); // you can watch individual input by pass the name of the input
 
//   return (
//     <form className="form-rhf" onSubmit={handleSubmit(onSubmit)}>
//       <label className="label-rhf">Titre</label>
//       <input
//         className="input-rhf"
//         {...register("titre", {
//           required: true,
//           //   maxLength: 20,
//           pattern: /^[A-Za-z]+$/i,
//         })}
//       />
//       {errors?.titre?.type === "required" && (
//         <p className="p-rhf">This field is required</p>
//       )}
//       {/* {errors?.titre?.type === "maxLength" && (
//             <p className="p-rhf" >First name cannot exceed 20 characters</p>
//           )} */}
//       {errors?.titre?.type === "pattern" && (
//         <p className="p-rhf">Alphabetical characters only</p>
//       )}
 
//       <label className="label-rhf">Année</label>
//       <input
//         className="input-rhf"
//         {...register("annee", { min: 1500, max: 2100 })}
//       />
//       {errors.annee && (
//         <p className="p-rhf">L'année doit être sur 4 caractères</p>
//       )}
 
//       <label className="label-rhf">Auteur</label>
//       <input
//         className="input-rhf"
//         {...register("auteur", { pattern: /^[A-Za-z]+$/i })}
//       />
//       {errors?.auteur?.type === "pattern" && (
//         <p className="p-rhf">Alphabetical characters only</p>
//       )}
 
//       <label className="label-rhf">URL de l'image</label>
//       <input className="input-rhf" {...register("imageUrl")} />
 
//       <input type="submit" className="input-rhf" />
//     </form>
//   );
// };
 
// export default UpdateItem;