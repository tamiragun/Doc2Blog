import React, { useState, useEffect } from "react";
import DeadlineForm from "./DeadlineForm";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const Deadlines = () => {
  const [addingDeadline, setAddingDeadline] = useState(false);
  const [deadlines, setDeadlines] = useState([]);
  const toggleAddingDeadline = () => {
    setAddingDeadline(!addingDeadline);
  };

  // Helper function to get the deadlines from the server and set the state accordingly
  const getDeadlines = async () => {
    const url = "/blog";
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

  // Upon first render, call the helper functions to obtain the deadlines
  useEffect(() => {
    getDeadlines();
  }, []);

  // When the user clicks "mark as complete" on one of the deadlines
  const markPublished = async (event) => {
    const id = event.target.name;
    const url = "/reminders/project";
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
        getDeadlines();
      }
    } catch (error) {
      console.log(error);
      //setIsError(error);
    }
  };

  // Once deadlines are set by the useEfect hook, generate a JSX list of those deadlines with buttons each.
  const deadlineList = deadlines.map((deadline) => {
    return (
      <tr key={deadline.id}>
        <td>{deadline.topic}</td>
        <td>{deadline.postDate}</td>
        <td>
          <Button
            variant="primary"
            className="button"
            name={deadline.id}
            onClick={markPublished}
          >
            Mark as published
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      {
        /* If the deadlines haven't updated yet, display a holding message. */
        !deadlines ? (
          "loading..."
        ) : (
          <div>
            <Table striped bordered hover size="sm" responsive="sm">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Due date</th>
                  <th>Publish</th>
                </tr>
              </thead>
              <tbody>{deadlineList}</tbody>
            </Table>
          </div>
        )
      }
      {!addingDeadline && (
        <Button variant="primary" onClick={() => toggleAddingDeadline()}>
          Add new deadline
        </Button>
      )}
      {addingDeadline && (
        <DeadlineForm
          onComplete={() => {
            getDeadlines();
            toggleAddingDeadline();
          }}
        ></DeadlineForm>
      )}
    </div>
  );
};

export default Deadlines;
