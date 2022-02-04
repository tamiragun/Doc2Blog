// Component that renders either the list of deadlines/reminders of a logged in user,
// or login/registration options when the user is not logged in.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Deadlines from "./Deadlines";
import Reminders from "./Reminders";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

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
  //   useEffect(() => {
  //     setIsError(false);
  //     const token = sessionStorage.getItem("token");
  //     // Async IIFE to call the server with this token:
  //     (async () => {
  //       // If a token is set, toggle the state to logged in and call the server
  //       if (token) {
  //         setLoggedIn(true);
  //         const url = "/authentication/home";
  //         // Call the server to check the token and obtain the role and affiliation
  //         // based on its payload
  //         try {
  //           const response = await fetch(url, {
  //             method: "POST",
  //             headers: {
  //               "Content-type": "application/json",
  //               Authorization: `Bearer ${token}`,
  //             },
  //             body: null,
  //           });
  //           const jsonResponse = await response.json();
  //           // If there has been an error, set the error state hook to the arror
  //           // message, which will then be displayed on the page.
  //           if (jsonResponse.error) {
  //             console.log(jsonResponse.error);
  //             setIsError(jsonResponse.message);
  //           } else {
  //             // If successful, store the user's role and affiliation in the component's state
  //             setRole(jsonResponse.role);
  //             setAffiliation(jsonResponse.affiliation);
  //           }
  //         } catch (error) {
  //           console.log(error);
  //           setIsError(error);
  //         }
  //       }
  //     })();
  //   }, []);

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
              <h2>Register or log in to access your blogposts:</h2>
              <Button variant="primary" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="primary" onClick={() => navigate("/register")}>
                Register
              </Button>
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
