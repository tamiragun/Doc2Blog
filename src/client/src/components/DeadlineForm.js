import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./DeadlineForm.css";

const DeadlineForm = (props) => {
  const [topic, setTopic] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [postRecurrence, setPostRecurrence] = useState("never");

  // Handler for when the final form is submitted.
  const handleSubmit = (event) => {
    // Prevent the browser from re-loading the page
    event.preventDefault();

    // API IIFE call to server to save the deadline
    (async () => {
      let requestedFields = {
        topic: topic,
        postDate: dueDate,
        remPeriod: reminderTime,
        postRecurrence: postRecurrence,
      };
      const url = "/blog";
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestedFields),
        });
        //const jsonResponse = await response.json();
        // If there has been an error, set the error state hook to the error
        // message, which will then be displayed on the page.
        if (response.status !== 200) {
          console.log(response.statusText);
          //setIsError(jsonResponse.error_message);
        } else {
          // If successful, print message, reload deadlines and reminders,
          // and make the form disappear
          console.log("Successfully added deadline");
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
    } else if (event.target.name === "post-recurrence") {
      setPostRecurrence(event.target.id);
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
        <Form.Label>Due date</Form.Label>
        <Form.Control
          type="date"
          name="due-date"
          required
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRecurring">
        <Form.Label>How often does this deadline recur?</Form.Label>
        <div className="mb-3" onChange={handleChange} required>
          <Form.Check
            type="radio"
            label="Never"
            id="never"
            name="post-recurrence"
            defaultChecked
          />

          <Form.Check
            type="radio"
            label="Weekly"
            id="weekly"
            name="post-recurrence"
          />

          <Form.Check
            type="radio"
            label="Monthly"
            id="monthly"
            name="post-recurrence"
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicReminderTime">
        <Form.Label>
          How many days ahead would you like to be reminded?
        </Form.Label>
        <Form.Control
          type="number"
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

      <Button
        className="cancel-button"
        variant="secondary"
        onClick={props.onCancel}
      >
        Cancel
      </Button>
    </Form>
  );
};

export default DeadlineForm;
