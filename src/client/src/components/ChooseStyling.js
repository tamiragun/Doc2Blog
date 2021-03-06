// Component that renders one of the blog upload steps: choosing the stylesheet.

import React from "react";
import Form from "react-bootstrap/Form";

export const ChooseStyling = ({ selectStyle }) => {
  // Handler for controlled form element, updates the corresponding
  // state
  const handleChange = (event) => {
    const chosenStyle = event.target.id;
    // Call the parent's method, which stores the style in state.
    selectStyle(chosenStyle);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formSelectStylesheet">
        <div className="mb-3" onChange={handleChange}>
          <Form.Check
            type="radio"
            label="Basic"
            id="basic"
            name="stylesheet"
            defaultChecked
          />

          {/* This option is called boldx so that it would have the same length as the other two styles,
          so that it can be parsed easily by the server. */}
          <Form.Check type="radio" label="Bold" id="boldx" name="stylesheet" />

          <Form.Check type="radio" label="Sleek" id="sleek" name="stylesheet" />
        </div>
      </Form.Group>
    </Form>
  );
};

export default ChooseStyling;
