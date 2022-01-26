import React, { useState, useEffect } from "react";
import DeadlineForm from "./DeadlineForm";

const Deadlines = () => {
  const [addingDeadline, setAddingDeadline] = useState(false);
  const [deadlines, setDeadlines] = useState([]);
  const [reminders, setReminders] = useState([]);

  const toggleAddingDeadline = () => {
    setAddingDeadline(!addingDeadline);
  };

  // Helper function to get the deadlines from the server and set the state accordingly
  const getDeadlines = async () => {
    const url = "/reminders/project";
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
        // If successful, update the state with the list of deadlines
        const jsonResponse = await response.json();
        setDeadlines(jsonResponse);
      }
    } catch (error) {
      console.log(error);
      //setIsError(error);
    }
  };

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
    getDeadlines();
    getReminders();
  }, []);

  // Once deadlines are set by the useEfect hook, generate a JSX list of those deadlines with buttons each.
  const deadlineList = deadlines.map((deadline) => {
    return (
      <tr key={deadline[0]}>
        <td>{deadline[1]}</td>
        <td>{deadline[2]}</td>
        {/* <td>
          <button
            className="button"
            name={credential._id}
            onClick={() => setEditCredential(credential._id)}
          >
            Edit credential
          </button>
        </td> */}
      </tr>
    );
  });

  // Once reminders are set by the useEfect hook, generate a JSX list of those reminders with buttons each.
  const reminderList = reminders.map((reminder) => {
    return (
      <tr key={reminder[0]}>
        <td>{reminder[1]}</td>
        {/* <td>
          <button
            className="button"
            name={credential._id}
            onClick={() => setEditCredential(credential._id)}
          >
            Edit credential
          </button>
        </td> */}
      </tr>
    );
  });

  return (
    <div>
      {!addingDeadline && (
        <button onClick={() => toggleAddingDeadline()}>Add new deadline</button>
      )}
      {addingDeadline && (
        <DeadlineForm onComplete={toggleAddingDeadline}></DeadlineForm>
      )}
      {
        /* If the deadlines haven't updated yet, display a holding message. */
        !deadlines ? "loading..." : deadlineList
      }
      {
        /* If the reminders haven't updated yet, display a holding message. */
        !reminders ? "loading..." : reminderList
      }
    </div>
  );
};

export default Deadlines;
