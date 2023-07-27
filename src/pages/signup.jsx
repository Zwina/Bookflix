import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// import "./update.css";

const Signup = (props) => {
  const auth = useContext(AuthContext);
  // const [isLoginMode, setIsLoginMode] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    // console.log(form.titre);
    console.log({ form });
    async function signupUser() {
      //   if (isLoginMode) {
      try {
        const response = await fetch(
          //   process.env.REACT_APP_BACKEND_URL + `/users/signup`, {
          "https://pea-coat-sockeye.cyclic.app/api/users/signup",
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
        //   console.log("responseData", responseData);
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        setHttpErrors(err.message);
        // console.log("err : " + err.message);
      }
    }

    signupUser();
    //
    // } catch (err) {}
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // setOeuvre({
    //   ...oeuvre,
    //   [e.target.name]: e.target.value,
    // });
    // console.log(form);
    setFormIsValid(handleValidation(e.target.name, e.target.value));
    // console.log("formIsValid", typeof (formIsValid));
  };

  // const [submitted, setSubmitted] = useState(false);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (handleValidation() === true) {
  //       props.handleClick(form);
  //       // setSubmitted(true);
  //     }
  //   };

  const handleValidation = (itemToControl, itemValue) => {
    let inputErrors = {};
    let isFormValid = true;

    console.log({ itemToControl }, { itemValue });

    if (!itemToControl || itemToControl === "email") {
      if (!itemValue) {
        isFormValid = false;
        inputErrors.email = "L'email doit être renseigné!";
      } else if (typeof itemValue !== undefined) {
        if (
          !form.email.match(
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
        } else if (form.confirmPassword && itemValue !== form.confirmPassword) {
          isFormValid = false;
          inputErrors.confirmPassword =
            "Les mots de passe ne sont pas identiques";
        }
      }
    }

    if (!itemToControl || itemToControl === "confirmPassword") {
      if (!itemValue) {
        isFormValid = false;
        inputErrors.confirmPassword =
          "La confirmation de mot de passe doit être renseignée!";
      } else if (typeof itemValue !== undefined) {
        if (!itemValue.match(/[A-Za-z\d]$/)) {
          isFormValid = false;
          inputErrors.confirmPassword =
            "Ne doit contenir que des alphanumériques!";
        } else if (form.password && form.password !== itemValue) {
          isFormValid = false;
          inputErrors.confirmPassword =
            "Les mots de passe ne sont pas identiques";
        }
      }
    }

    setErrors(inputErrors);
    // console.log({inputErrors});
    // console.log({errors});
    // setFormIsValid(isFormValid);
    // console.log("isFormValid", isFormValid);
    return isFormValid;
  };

  return (
    <React.Fragment>
      <Container style={{ minHeight: "60vh" }}>
        {/* <div className="div-tag"> */}
        <p style={{ color: "red" }}>{httpErrors}</p>
        <Form onSubmit={authSubmitHandler} className="text-white">
          {/* <form className="form-tag" onSubmit={authSubmitHandler}> */}
          <h3 className="mb-3 text-white">Connexion</h3>

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
            />
            <Form.Text className="text-secondary">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Text style={{ color: "red" }}>{errors.email}</Form.Text>
          </Form.Group>
          {/* 
        <label htmlFor="email" className="label-tag">
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
        <span className="error-tag">{errors.email}</span>

        <label htmlFor="password" className="label-tag">
          Password: <span>*</span>
        </label> */}

          <Form.Group className="mb-3">
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

          {/* <input
          type="password"
          id="password"
          name="password"
          className="input-tag"
          placeholder="Renseigner le mdp"
          onChange={(e) => handleChange(e)}
        /> */}
          {/* <span className="error-tag">{errors.password}</span> */}

          <Form.Group className="mb-3">
            <Form.Label htmlFor="confirmPassword">
              Password: <span>*</span>
            </Form.Label>
            <Form.Control
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirmer le mdp"
              onChange={(e) => handleChange(e)}
            />
            <Form.Text style={{ color: "red" }}>
              {errors.confirmPassword}
            </Form.Text>
          </Form.Group>

          {/* <label htmlFor="confirmPassword" className="label-tag">
          Password: <span>*</span>
        </label>

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="input-tag"
          placeholder="Confirmer le mdp"
          onChange={(e) => handleChange(e)}
        />
        <span className="error-tag">{errors.confirmPassword}</span>
        <br></br> */}

          {/* <button
          type="submit"
          className="button-tag"
          disabled={!formIsValid}
          style={{ backgroundColor: formIsValid ? "black" : "red" }}
        >
          {isLoginMode ? 'SIGNUP' : 'LOGIN'}
          SIGNUP
        </button> */}

          <Button
            variant="primary"
            type="submit"
            disabled={!formIsValid}
            style={{ backgroundColor: formIsValid ? "primary" : "warning" }}
          >
            Submit
          </Button>
          {/* </form> */}
        </Form>
        {/* <button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </button> */}
        {/* </div> */}
      </Container>
    </React.Fragment>
  );
};

export default Signup;
