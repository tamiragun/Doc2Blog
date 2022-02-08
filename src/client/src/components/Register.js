// Component that renders a registration form

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import "./Register.css";

export const Register = (props) => {
  // Use navigate to be able to link to other Routes.
  const navigate = useNavigate();

  // Error toggle to capture any API call failures and display a user-friendly
  // error message.
  const [isError, setIsError] = useState(false);

  // Declare states purely to control the form elements.
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TODO: add second password for validation?

  // Single handler for all controlled form elements, updates the corresponding
  // state depending on which field was typed in.
  const handleChange = (event) => {
    const currentValue = event.target.value;
    if (event.target.name === "name") {
      setName(currentValue);
    } else if (event.target.name === "username") {
      setUsername(currentValue);
    } else if (event.target.name === "email") {
      setEmail(currentValue);
    } else if (event.target.name === "password") {
      setPassword(currentValue);
    }
  };

  // Handler for when the final form is submitted.
  const handleSubmit = async (event) => {
    setIsError(false);
    // Prevent the browser from re-loading the page
    event.preventDefault();
    // Call the server with the different state hooks in the body.
    const url = "/auth/user/register";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: name,
          username: username,
          email: email,
          password: password,
        }),
      });
      navigate("/login");
      const jsonResponse = await response.json();
      console.log("Successfully registered user " + jsonResponse.name);
      // // If there has been an error, set the error state hook to the error
      // // message, which will then be displayed on the page.
      // if (jsonResponse.error) {
      //   console.log(jsonResponse.error);
      //   setIsError(jsonResponse.message);
      //   // If instead the token was set successfully, store that in session storage
      //   // do that the token can be checked throughout the user's session across the app
      // } else if (jsonResponse.token) {
      //   sessionStorage.setItem("token", jsonResponse.token);
      //   // Reset the states back to empty, so that the form looks blank again.
      //   setName("");
      //   setEmail("");
      //   setPassword("");
      //   // Redirect the user to the next page.
      //   navigate("/");
      // } else {
      //   setIsError(
      //     "There was an error with your registration. Please contact an admin for support."
      //   );
      // }
    } catch (error) {
      console.log(error);
      setIsError(error);
    }
  };

  return (
    <div className="register-form">
      {/*If there was any kind of error, display only the error message with nav buttons */}
      {isError ? (
        <div>
          <Alert variant="danger">
            <Alert.Heading>Sorry!</Alert.Heading>
            <p>There was an eror performing this action: {isError}</p>
            <Button onClick={() => setIsError(false)} variant="outline-danger">
              Try again
            </Button>
          </Alert>
        </div>
      ) : (
        // Otherwise, display the registration form
        <div>
          <Card className="mx-auto" style={{ maxWidth: "30rem" }}>
            <Card.Header className="text-center">
              <h2>Register</h2>
            </Card.Header>
            <Card.Body>
              <div className="form-card">
                <Form onSubmit={handleSubmit}>
                  <div className="form-fields">
                    <Form.Group className="mb-3" controlId="formRegisterName">
                      <Form.Label>Name:</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formRegisterUserName"
                    >
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        required
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRegisterEmail">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formRegisterPassword"
                    >
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="text"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                      ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary" value="Register">
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>
          {/*Allow the user to switch to the login page instead */}
          <div className="switch-login text-center">
            <p>Already a user? Log in here:</p>
            <Button variant="secondary" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
