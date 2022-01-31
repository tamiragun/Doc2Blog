import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);

  // Helper function to get the reminders from the server and set the state accordingly
  const getReminders = async () => {
    const url = "/reminders";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          //Authorization: `Bearer ${token}`,
        },
        body: null,
      });
      // If there has been an error, set the error state hook to the error
      // message, which will then be displayed on the page.
      if (response.status !== 200) {
        console.log(response.statusText);
        //setIsError(jsonResponse.message);
      } else {
        // If successful, update the state with the list of reminders
        const jsonResponse = await response.json();
        setReminders(jsonResponse);
      }
    } catch (error) {
      console.log(error);
      //setIsError(error);
    }
  };

  // Upon first render, call the helper functions to obtain the deadlines
  useEffect(() => {
    getReminders();
  }, []);

  // When the user acknowledges one of the reminders
  const markAcknowledged = async (id) => {
    const url = "/reminders";
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          //Authorization: `Bearer ${token}`,
        },
        body: id,
      });
      // If there has been an error, set the error state hook to the error
      // message, which will then be displayed on the page.
      if (response.status !== 200) {
        console.log(response.statusText);
        //setIsError(jsonResponse.message);
      } else {
        // If successful, reload list of deadlines
        getReminders();
      }
    } catch (error) {
      console.log(error);
      //setIsError(error);
    }
  };

  // Once reminders are set by the useEfect hook, generate a JSX list of those reminders with buttons each.
  const reminderList = reminders.map((reminder) => {
    return (
      <Alert
        key={reminder.reminderId}
        variant="warning"
        onClose={() => markAcknowledged(reminder.reminderId)}
        dismissible
      >
        <Alert.Heading>Upcoming deadline!</Alert.Heading>
        <p>{reminder.reminder}</p>
      </Alert>
    );
  });

  return (
    <div>
      {
        /* If the reminders haven't updated yet, display a holding message. */
        !reminders ? "loading..." : <div>{reminderList}</div>
      }
    </div>
  );
};

export default Reminders;
