// Component that renders either the list of deadlines/reminders of a logged in user,
// or login/registration options when the user is not logged in.

import React, { useState, useEffect } from "react";
import Deadlines from "./Deadlines";
import Reminders from "./Reminders";
import Alert from "react-bootstrap/Alert";
import LoggedOutCard from "./LoggedOutCard.js";

export const HomePage = ({ loggedIn }) => {
  // Error toggle to capture any API call failures and display a user-friendly
  // error message.
  const [isError, setIsError] = useState(false);

  // Store the list of applicable deadlines and reminders retrieved from the server into state
  const [deadlines, setDeadlines] = useState([]);
  const [reminders, setReminders] = useState([]);

  // Upon first render, check if the user is logged in (i.e. if a token is set)
  // If so, call the server to populate deadlines and reminders, and set the
  // state so that they can be rendered.
  useEffect(() => {
    setIsError(false);
    if (loggedIn) {
      getDeadlines();
      getReminders();
    }
    // To be repeated if the login state changes.
  }, [loggedIn]);

  // Upon any changes, reload deadlines
  const refreshDeadlinesAndReminders = () => {
    getDeadlines();
    getReminders();
  };

  // Helper function to get the deadlines from the server and set the state accordingly
  const getDeadlines = async () => {
    const url = "/blog";
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: null,
      });
      // If there has been an error, set the error state hook to the error
      // message, which will then be displayed on the page.
      if (response.status !== 200) {
        console.log(response.statusText);
        //setIsError(jsonResponse.message);
      } else {
        // If successful, update the state with the list of deadlines
        const jsonResponse = await response.json();
        setDeadlines(jsonResponse);
      }
    } catch (error) {
      console.log(error);
      //setIsError(error.message);
    }
  };

  // Helper function to get the reminders from the server and set the state accordingly
  const getReminders = async () => {
    const url = "/reminders";
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: null,
      });
      const jsonResponse = await response.json();
      // If there has been an error, set the error state hook to the error
      // message, which will then be displayed on the page.
      if (response.status !== 200) {
        console.log(response.statusText);
        //setIsError(jsonResponse.error_message);
      } else {
        // If successful, update the state with the list of reminders
        setReminders(jsonResponse);
      }
    } catch (error) {
      console.log(error);
      //setIsError(error.message);
    }
  };

  return (
    <div className="home-page">
      {/*If there was any kind of error, display only the error message with nav buttons */}
      {isError ? (
        <Alert variant="danger">
          <Alert.Heading>Sorry!</Alert.Heading>
          <p>There was an error performing this action: {isError}</p>
        </Alert>
      ) : (
        <div>
          {/*If the user is not logged in, display the login/registration options */}
          {!loggedIn && (
            <LoggedOutCard logoutText="Register or log in to access your blog posts:"></LoggedOutCard>
          )}
          {/*If the user is logged in, display the list of deadlines and reminders */}
          {loggedIn && (
            <div>
              <Reminders
                reminders={reminders}
                refreshDeadlinesAndReminders={refreshDeadlinesAndReminders}
              ></Reminders>
              <Deadlines
                deadlines={deadlines}
                refreshDeadlinesAndReminders={refreshDeadlinesAndReminders}
              ></Deadlines>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
