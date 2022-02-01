// See https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPost from "./components/BlogPost";
import Deadlines from "./components/Deadlines";
import Reminders from "./components/Reminders";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  return (
    <div>
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
          {/* <Route path="/blogPost/add"></Route> */}
          <Route exact path="/blogPost" element={<BlogPost />}></Route>
          <Route exact path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
