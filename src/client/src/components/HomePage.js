// Component that renders either the list of deadlines/reminders of a logged in user,
// or login/registration options when the user is not logged in.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Deadlines from "./Deadlines";
import Reminders from "./Reminders";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Typewriter from "../images/typewriter.svg";
import Image from "react-bootstrap/Image";
import "./HomePage.css";

export const HomePage = (props) => {
  // Use navigate to be able to link to other Routes.
  const navigate = useNavigate();
  // Error toggle to capture any API call failures and display a user-friendly
  // error message.
  const [isError, setIsError] = useState(false);
  // Toggle whether or not a user is logged in, this will influence whether
  // the logins or the affiliations are displayed.
  const [loggedIn, setLoggedIn] = useState(false);
  // The array of affiliations to display if a user is logged in

  // Upon first render, check if the user is logged in (i.e. if a token is set)
  useEffect(() => {
    setIsError(false);
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="home-page">
      {/*If there was any kind of error, display only the error message with nav buttons */}
      {isError ? (
        <Alert variant="danger">
          <Alert.Heading>Sorry!</Alert.Heading>
          <p>There was an eror performing this action: {isError}</p>
        </Alert>
      ) : (
        <div>
          {/*If the user is not logged in, display the login/registration options */}
          {!loggedIn && (
            <div>
              <div
                className="homepage-intro text-center mx-auto"
                style={{ maxWidth: "60rem" }}
              >
                <h2>Welcome to Doc2Blog!</h2>
                <figure>
                  <Image
                    fluid
                    src={Typewriter}
                    alt="Typewriter"
                    style={{ width: "100%", height: "auto" }}
                    className="img-fluid"
                  ></Image>
                </figure>
                <p>
                  Doc2Blog is a blog management tool that allows you to manage
                  your blog post deadlines with handy reminders. It also lets
                  you upload your posts in Microsoft Word or Open Source doc
                  format. We perform a basic spellcheck for you and when you are
                  happy with the version to publish, we convert it to HTML and
                  publish it for you. Easy!
                </p>
              </div>

              <div className="homepage-authentication-buttons text-center">
                <Card
                  className="mx-auto"
                  style={{ maxWidth: "30rem", padding: "20px" }}
                >
                  <Card.Title>
                    Register or log in to access your blogposts:
                  </Card.Title>
                  <Card.Body>
                    <Button
                      variant="primary"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}
          {/*If the user is logged in, display the list of affiliations te user belongs to */}
          {loggedIn && (
            <div className="deadlines-card">
              <Reminders></Reminders>
              <Deadlines></Deadlines>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
