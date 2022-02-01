// Component that renders a login form

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export const Login = (props) => {
  // Use navigate to be able to link to other Routes.
  const navigate = useNavigate();

  // Error toggle to capture any API call failures and display a user-friendly
  // error message.
  const [isError, setIsError] = useState(false);

  // Declare states purely to control the form elements.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Single handler for all controlled form elements, updates the corresponding
  // state depending on which field was typed in.
  const handleChange = (event) => {
    const currentValue = event.target.value;
    if (event.target.name === "email") {
      setEmail(currentValue);
    } else if (event.target.name === "password") {
      setPassword(currentValue);
    }
  };

  // Handler for when the final form is submitted.
  const handleSubmit = async (event) => {
    //     setIsError(false);
    //     // Prevent the browser from re-loading the page
    //     event.preventDefault();
    //     // Call the server with the different states as arguments.
    //     const url = "/authentication/login";
    //     try {
    //       const response = await fetch(url, {
    //         method: "POST",
    //         headers: { "Content-type": "application/json" },
    //         body: JSON.stringify({ email: email, password: password }),
    //       });
    //       const jsonResponse = await response.json();
    //       // If there has been an error, set the error state hook to the arror
    //       // message, which will then be displayed on the page.
    //       if (jsonResponse.error) {
    //         console.log(jsonResponse.error);
    //         setIsError(jsonResponse.message);
    //         // If instead the token was set successfully, store that in session storage
    //         // do that the token can be checked throughout the user's session across the app
    //       } else if (jsonResponse.token) {
    //         sessionStorage.setItem("token", jsonResponse.token);
    //         // Reset the states back to empty, so that the form looks blank again.
    //         setEmail("");
    //         setPassword("");
    //         // Redirect the user to the next page.
    //         navigate("/");
    //       } else {
    //         setIsError("Your login and/or password didn't match");
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       setIsError(error);
    //     }
  };

  return (
    <div className="login-form">
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
        // Otherwise, display the login form
        <div>
          <h2>Log in</h2>
          <div className="form-card">
            <Form onSubmit={handleSubmit}>
              <div className="form-fields">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email:</Form.Label>

                  <Form.Control
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password:</Form.Label>

                  <Form.Control
                    type="text"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    requried
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" value="Login">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
          {/*Allow the user to switch to the registration page instead */}
          <p>Not a user yet? Register here:</p>
          <Button
            className="button nav-button"
            variant="secondary"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
};

export default Login;
