// See https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPost from "./components/BlogPost";
import HomePage from "./components/HomePage";
import StyleGuide from "./components/StyleGuide";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";

import "./App.css";

function App() {
  // Toggle whether or not a user is logged in, this will influence whether
  // the logins or the registration are displayed.
  const [loggedIn, setLoggedIn] = useState(false);

  // Upon first render, check if the user is logged in (i.e. if a token is set)
  // If so, set the state so that they can be rendered
  useEffect(() => {
    toggleLogin();
  }, []);

  const toggleLogin = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  return (
    <div className="page-body">
      <Header loggedIn={loggedIn} toggleLogin={toggleLogin} />
      <main>
        <Container>
          <Router>
            <Routes>
              <Route
                exact
                path="/login"
                element={<Login toggleLogin={toggleLogin} />}
              ></Route>
              <Route exact path="/register" element={<Register />}></Route>
              <Route
                exact
                path="/blogPost"
                element={<BlogPost loggedIn={loggedIn} />}
              ></Route>
              <Route exact path="/style-guide" element={<StyleGuide />}></Route>
              <Route
                exact
                path="/"
                element={<HomePage loggedIn={loggedIn} />}
              ></Route>
            </Routes>
          </Router>
        </Container>
      </main>
      <footer className="mt-auto py-3 bg-light">
        <Container>
          <Footer />
        </Container>
      </footer>
    </div>
  );
}

export default App;
