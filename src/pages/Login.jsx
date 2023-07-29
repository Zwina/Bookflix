import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./update.css";

const Login = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [httpErrors, setHttpErrors] = useState();
  //   const history = useHistory();
  // console.log(oeuvreId);

  //   const switchModeHandler = () => {
  //     setIsLoginMode(isLoginMode ? "false" : "true" );
  //     }

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    async function authUser() {
      try {
        const response = await fetch(
          //   process.env.REACT_APP_BACKEND_URL + `/users/login`, {
          `https://pea-coat-sockeye.cyclic.app/api/users/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: form.email,
              password: form.password,
            }),
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          // console.log("throw : " + responseData.message);
          throw new Error(responseData.message);
        }
        // console.log("responseData", responseData);
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        console.log(err.message);
        setHttpErrors(err.message);
      }
    }
    authUser();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // setForm((prevForm) => ({
    //   ...prevForm,
    //   [e.target.name]: e.target.value,
    // }));

    setFormIsValid(handleValidation(e.target.name, e.target.value));
    // console.log("formIsValid", typeof (formIsValid));
    // console.log(form);
  };

  const handleValidation = (itemToControl, itemValue) => {
    let inputErrors = {};
    let isFormValid = true;

    if (!itemToControl || itemToControl === "email") {
      if (!itemValue) {
        isFormValid = false;
        inputErrors.email = "L'email doit être renseigné!";
      } else if (typeof itemValue !== undefined) {
        if (
          !itemValue.match(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
          )
        ) {
          isFormValid = false;
          inputErrors.email = "Doit être un email!";
        }
      }
    }

    if (!itemToControl || itemToControl === "password") {
      if (!itemValue) {
        isFormValid = false;
        inputErrors.password = "Le mot de passe doit être renseigné!";
      } else if (typeof itemValue !== undefined) {
        if (!itemValue.match(/[A-Za-z\d]$/)) {
          isFormValid = false;
          inputErrors.password = "Ne doit contenir que des alphanumériques!";
        }
      }
    }

    setErrors(inputErrors);
    // setFormIsValid(isFormValid);
    // console.log("isFormValid", typeof (isFormValid));
    return isFormValid;
  };

  return (
    <React.Fragment>
      <Container style={{ minHeight: "50vh" }}>
      {/* <div className="div-tag"> */}
      <p style={{ color: "red" }}>{httpErrors}</p>
      <Form onSubmit={authSubmitHandler} className="text-white mb-4">
        {/* <form className="form-tag" onSubmit={authSubmitHandler}> */}
        <h3>Connexion</h3>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">
            {" "}
            Email: <span>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="email"
            name="email"
            placeholder="Entrer votre email"
            onChange={(e) => handleChange(e)}
            className="mb-3"
          />
          <Form.Text style={{ color: "red" }}>{errors.email}</Form.Text>
        </Form.Group>

        {/* <label htmlFor="email" className="label-tag">
            Email: <span>*</span>
          </label> */}

        {/* <input
            type="text"
            id="email"
            name="email"
            className="input-tag"
            placeholder="Renseigner l'email"
            onChange={(e) => handleChange(e)}
          />
          <span className="error-tag">{errors.email}</span> */}

        <Form.Group className="mb-3" >
          <Form.Label htmlFor="password">
            Password: <span>*</span>
          </Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            placeholder="Renseigner le mdp"
            onChange={(e) => handleChange(e)}
          />
          <Form.Text style={{ color: "red" }}>{errors.password}</Form.Text>
        </Form.Group>

        {/* <label htmlFor="password" className="label-tag">
            Password: <span>*</span>
          </label> */}

        {/* <input
            type="password"
            id="password"
            name="password"
            className="input-tag"
            placeholder="Renseigner le mdp"
            onChange={(e) => handleChange(e)}
          />
          <span className="error-tag">{errors.password}</span> */}

        <Button
          variant="primary"
          type="submit"
          disabled={!formIsValid}
          style={{ backgroundColor: formIsValid ? "primary" : "warning" }}
        >
          Login
        </Button>

        {/* <button type="submit" className="button-tag">LOGIN</button> */}
        {/* </form> */}
      </Form>
      <p style={{ color: "white" }}>Vous n'avez pas encore de compte? <a href='#/signup'>Créez le !</a></p>
      {/* </div> */}
      </Container>
    </React.Fragment>
  );
};

export default Login;
