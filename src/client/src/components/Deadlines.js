import React, { useState } from "react";
import DeadlineForm from "./DeadlineForm";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router";
import "./Deadlines.css";

const Deadlines = ({ deadlines, refreshDeadlinesAndReminders }) => {
  const [addingDeadline, setAddingDeadline] = useState(false);
  const toggleAddingDeadline = () => {
    setAddingDeadline(!addingDeadline);
  };
  // Use navigate to be able to link to other Routes.
  const navigate = useNavigate();

  // When the user clicks "mark as complete" on one of the deadlines
  const markPublished = async (event) => {
    const id = event.target.name;
    const url = "/blog";
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: id,
      });
      //const jsonResponse = await response.json();
      // If there has been an error, set the error state hook to the error
      // message, which will then be displayed on the page.
      if (response.status !== 200) {
        console.log(response.statusText);
        //setIsError(jsonResponse.error_message);
      } else {
        // If successful, reload list of deadlines and reminders
        refreshDeadlinesAndReminders();
      }
    } catch (error) {
      console.log(error);
      //setIsError(error.message);
    }
  };

  // Once deadlines are set by the useEffect hook, generate a JSX list of those deadlines with buttons each.
  const deadlineList = deadlines.map((deadline) => {
    return (
      <tr key={deadline.id}>
        {!deadline.overdue && <td>{deadline.topic}</td>}
        {deadline.overdue && <td className="text-danger">{deadline.topic}</td>}
        {!deadline.overdue && (
          <td style={{ width: 100 }} className="text-center">
            {deadline.postDate}
          </td>
        )}
        {deadline.overdue && (
          <td style={{ width: 100 }} className="text-center text-danger">
            {deadline.postDate}
          </td>
        )}
        {!deadline.overdue && (
          <td className="text-center mw-100 upload-column">
            <Button
              variant="primary"
              size="sm"
              className="d-none d-md-block"
              name="link-to-upload"
              onClick={() => {
                navigate("/blogPost");
              }}
            >
              Upload draft
            </Button>

            <i
              className="bi-upload d-md-none"
              name="link-to-upload"
              onClick={() => {
                navigate("/blogPost");
              }}
            ></i>
          </td>
        )}
        {deadline.overdue && (
          <td className="text-center mw-100 upload-column">
            <Button
              variant="danger"
              size="sm"
              className="d-none d-md-block"
              name="link-to-upload"
              onClick={() => {
                navigate("/blogPost");
              }}
            >
              Upload draft
            </Button>

            <i
              className="bi-upload d-md-none text-danger"
              name="link-to-upload"
              onClick={() => {
                navigate("/blogPost");
              }}
            ></i>
          </td>
        )}
        {!deadline.overdue && (
          <td className="text-center mw-100 publish-column">
            <Button
              variant="primary"
              size="sm"
              className="d-none d-md-block"
              name={deadline.id}
              onClick={markPublished}
            >
              Mark published
            </Button>
            <i
              className="bi-check2-circle d-md-none"
              name={deadline.id}
              onClick={markPublished}
            ></i>
          </td>
        )}
        {deadline.overdue && (
          <td className="text-center mw-100 publish-column">
            <Button
              variant="danger"
              size="sm"
              className="d-none d-md-block"
              name={deadline.id}
              onClick={markPublished}
            >
              Mark published
            </Button>
            <i
              className="bi-check2-circle d-md-none text-danger"
              name={deadline.id}
              onClick={markPublished}
            ></i>
          </td>
        )}
      </tr>
    );
  });

  return (
    <div>
      <h2>Your future blog post topics</h2>
      {
        /* If the deadlines haven't updated yet, display a holding message. */
        !deadlines ? (
          "loading..."
        ) : (
          <div className="deadlines-table">
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Topic</th>
                  <th className="text-center">Due date</th>
                  <th className="text-center">Publish</th>
                  <th className="text-center">Remove</th>
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
          refreshDeadlinesAndReminders={refreshDeadlinesAndReminders}
          onCancel={() => {
            toggleAddingDeadline();
          }}
          onComplete={() => {
            refreshDeadlinesAndReminders();
            toggleAddingDeadline();
          }}
        ></DeadlineForm>
      )}
    </div>
  );
};

export default Deadlines;
