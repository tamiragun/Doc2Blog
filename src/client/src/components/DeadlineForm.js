import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const DeadlineForm = (props) => {
  const [topic, setTopic] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  // Handler for when the final form is submitted.
  const handleSubmit = (event) => {
    // Prevent the browser from re-loading the page
    event.preventDefault();

    // API IIFE call to server to save the project
    (async () => {
      let requestedFields = {
        topic: topic,
        postDate: dueDate,
        remPeriod: reminderTime,
      };
      const url = "/blog";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            //Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestedFields),
        });
        // If there has been an error, set the error state hook to the arror
        // message, which will then be displayed on the page.
        if (response.status !== 200) {
          console.log(response.statusText);
          //setIsError(jsonResponse.message);
        } else {
          // If successful, print message and make the form disappear
          console.log("Successfully added project");
          props.onComplete();
        }
      } catch (error) {
        console.log(error);
        //setIsError(error);
      }
    })();
  };

  // Single handler for all controlled form elements, updates the corresponding
  // state depending on which field was typed in.
  const handleChange = (event) => {
    const currentValue = event.target.value;
    if (event.target.name === "topic") {
      setTopic(currentValue);
    } else if (event.target.name === "due-date") {
      setDueDate(currentValue);
    } else if (event.target.name === "reminder-time") {
      setReminderTime(currentValue);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicTopic">
        <Form.Label>Topic</Form.Label>
        <Form.Control
          type="text"
          name="topic"
          required
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDueDate">
        <Form.Label>DueDate</Form.Label>
        <Form.Control
          type="date"
          name="due-date"
          required
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicReminderTime">
        <Form.Control
          type="number"
          //id="reminder-time"
          name="reminder-time"
          required
          min="1"
          max="60"
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        Submit
      </Button>

      <Button variant="secondary" onClick={props.onComplete}>
        Back
      </Button>
    </Form>
  );
};

export default DeadlineForm;
