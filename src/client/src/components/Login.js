// Component that renders a login form

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import "./Login.css";

export const Login = ({ toggleLogin }) => {
  // Use navigate to be able to link to other Routes.
  const navigate = useNavigate();

  // Error toggle to capture any API call failures and display a user-friendly
  // error message.
  const [isError, setIsError] = useState(false);

  // Declare states purely to control the form elements.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Single handler for all controlled form elements, updates the corresponding
  // state depending on which field was typed in.
  const handleChange = (event) => {
    const currentValue = event.target.value;
    if (event.target.name === "username") {
      setUsername(currentValue);
    } else if (event.target.name === "password") {
      setPassword(currentValue);
    }
  };

  // Handler for when the final form is submitted.
  const handleSubmit = async (event) => {
    setIsError(false);
    // Prevent the browser from re-loading the page
    event.preventDefault();
    // Call the server with the different states as arguments.
    const url = "/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });
      const jsonResponse = await response.json();
      // If there has been an error, set the error state hook to the error
      // message, which will then be displayed on the page.
      if (jsonResponse.error) {
        console.log(jsonResponse.error);
        //setIsError(jsonResponse.message);
        // If instead the token was set successfully, store that in session storage
        // do that the token can be checked throughout the user's session across the app
      } else if (jsonResponse.access_token) {
        sessionStorage.setItem("token", jsonResponse.access_token);
        // Reset the states back to empty, so that the form looks blank again.
        setUsername("");
        setPassword("");
        // Redirect the user to the next page.
        toggleLogin();
        navigate(-1);
      } else {
        setIsError("Your login and/or password didn't match");
      }
    } catch (error) {
      console.log(error);
      setIsError(error.message);
    }
  };

  return (
    <div className="login-form">
      {/*If there was any kind of error, display only the error message with nav buttons */}
      {isError ? (
        <div>
          <Alert variant="danger">
            <Alert.Heading>Sorry!</Alert.Heading>
            <p>There was an error performing this action: {isError}</p>
            <Button onClick={() => setIsError(false)} variant="outline-danger">
              Try again
            </Button>
          </Alert>
        </div>
      ) : (
        // Otherwise, display the login form
        <div>
          <Card className="mx-auto" style={{ maxWidth: "30rem" }}>
            <Card.Header className="text-center">
              <h2>Log in</h2>
            </Card.Header>
            <Card.Body>
              <div className="form-card">
                <Form onSubmit={handleSubmit}>
                  <div className="form-fields">
                    <Form.Group className="mb-3" controlId="formLoginUsername">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        required
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLoginPassword">
                      <Form.Label>Password:</Form.Label>

                      <Form.Control
                        type="text"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                      ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary" value="Login">
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>
          {/*Allow the user to switch to the registration page instead */}
          <div className="switch-register text-center">
            <p>Not a user yet? Register here:</p>
            <Button variant="secondary" onClick={() => navigate("/register")}>
              Register
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
