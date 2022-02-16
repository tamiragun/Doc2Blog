// Component that renders a step in the file upload stepper, based on props it gets.

import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./BlogPublishStep.css";

export const BlogPublishStep = (props) => {
  return (
    <div className="upload-blogpost-card">
      <Card className="mx-auto" style={{ maxWidth: "30rem" }}>
        <Card.Header>
          <h4>{props.header}</h4>
        </Card.Header>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.text}</Card.Text>
          {props.component}
        </Card.Body>
        <Card.Footer>
          <div className="back-or-next-buttons">
            <Button
              className="back-button"
              variant="secondary"
              onClick={props.handleBackClick}
            >
              Back
            </Button>
            <Button
              className="next-button"
              variant="primary"
              onClick={props.handleNextClick}
            >
              Next
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default BlogPublishStep;
