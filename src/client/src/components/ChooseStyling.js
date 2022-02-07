import React from "react";
import Form from "react-bootstrap/Form";

export const ChooseStyling = ({ selectStyle }) => {
  // Handler for controlled form element, updates the corresponding
  // state
  const handleChange = (event) => {
    const chosenStyle = event.target.id;
    selectStyle(chosenStyle);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formSelectStylesheet">
        <div className="mb-3" onChange={handleChange}>
          <Form.Check
            type="radio"
            label="Basic"
            id="basic-stylesheet"
            name="stylesheet"
            defaultChecked
          />

          <Form.Check
            type="radio"
            label="Bold"
            id="bold-stylesheet"
            name="stylesheet"
          />

          <Form.Check
            type="radio"
            label="Sleek"
            id="sleek-stylesheet"
            name="stylesheet"
          />
        </div>
      </Form.Group>
    </Form>
  );
};

export default ChooseStyling;
