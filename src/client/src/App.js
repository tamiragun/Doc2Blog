// See https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPost from "./components/BlogPost";
import Deadlines from "./components/Deadlines";
import Reminders from "./components/Reminders";
import HomePage from "./components/HomePage";
import StyleGuide from "./components/StyleGuide";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";

import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <Router>
            <Routes>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/register" element={<Register />}></Route>
              {/* <Route path="/deadlines/add"></Route> */}
              <Route
                exact
                path="/deadlines"
                element={
                  <>
                    <Reminders />
                    <Deadlines />
                  </>
                }
              ></Route>

              <Route exact path="/blogPost" element={<BlogPost />}></Route>
              <Route exact path="/style-guide" element={<StyleGuide />}></Route>
              <Route exact path="/" element={<HomePage />}></Route>
            </Routes>
          </Router>
        </Container>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
