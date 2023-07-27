import { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthContext from "./context/auth-context";
import { useAuth } from "./hook/auth-hook";

import LoginPage from "./pages/Login";
import SignupPage from "./pages/signup";
import Musiques from "./pages/Musiques";
import Film from "./pages/Film";
import Livres from "./pages/Livres";
import Banner from "./Components/Header/Banner";
import Accueil from "./pages/Accueil";
import NewItem from "./pages/NewItem";
import UpdateItem from "./pages/Update";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavOne from "./Components/Header/Nav";
import Footer from "./Components/Footer/Footer";
import Essai from "./pages/Essai";

function App() {
  const { token, login, logout, userId } = useAuth();
  console.log("token", token);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <div className="App">
        <Router>
          <NavOne />
          <Banner />

          <Routes>
            <Route exact path="/" element={<Accueil />} />
            <Route exact path="/essai" element={<Essai />} />
            <Route exact path="/#/musiques" element={<Musiques />} />
            <Route path="/films" element={<Film />} />
            <Route path="/livres" element={<Livres />} />

            {!token && <Route path="/login" element={<LoginPage />} exact />}
            {token && (
              <Route path="/login" element={<Navigate to="/" replace />} />
            )}

            {!token && <Route path="/signup" element={<SignupPage />} exact />}
            {token && (
              <Route path="/signup" element={<Navigate to="/" replace />} />
            )}

            {!token && (
              <Route path="/musiques/new" element={<Accueil />} exact />
            )}
            {token && (
              <Route
                path="/musiques/new"
                element={<NewItem route="musiques" />}
                replace
              />
            )}

            {/* <Route
              path="/musiques/new"
              element={<NewItem route="musiques" />}
            /> */}

            {!token && <Route path="/films/new" element={<Accueil />} exact />}
            {token && (
              <Route
                path="/films/new"
                element={<NewItem route="films" />}
                replace
              />
            )}

            {/* <Route
              path="/films/new"
              element={<NewItem route="films" />}
              exact
            /> */}

            {!token && <Route path="/livres/new" element={<Accueil />} exact />}
            {token && (
              <Route
                path="/livres/new"
                element={<NewItem route="livres" />}
                replace
              />
            )}

            {/* <Route path="/livres/new" element={<NewItem route="livres" />} /> */}

            {!token && (
              <Route path="/update" element={<Navigate to="/" replace />} />
            )}
            {token && <Route path="/update" element={<UpdateItem />} />}
          </Routes>

          {/* <Route path="/" exact>
          <h1 className="title">Accueil</h1>
          <Accueil />
        </Route>


        <Route path="/musiques" exact>
          <h1 className="title">Musiques</h1>
          <Musiques />
        </Route>

        <Route path="/films" exact>
          <h1 className="title">Films</h1>
          <Film />
        </Route>

        <Route path="/livres" exact>
          <h1 className="title">Livres</h1>
          <Livres />
        </Route>

        {!token && <Route path="/login" component={LoginPage} exact />}
          {token && <Redirect from="/login" to="/" exact /> }
          {!token && <Route path="/signup" component={SignupPage} exact />}
          {token && <Redirect from="/signup" to="/" exact /> }

        <Route path="/musiques/new" exact>
        <h1 className="title">Nouvel objet</h1>
        <NewItem route="musiques"/>
        </Route>

        <Route path="/films/new" exact>
        <h1 className="title">Nouvel objet</h1>
        <NewItem route="films"/>
        </Route>

        <Route path="/livres/new" exact>
        <h1 className="title">Nouvel objet</h1>
        <NewItem route="livres"/>
        </Route>

        <Route path="/update" exact>
        <h1 className="title">Update</h1>
        <UpdateItem/>
        </Route> */}
        </Router>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
