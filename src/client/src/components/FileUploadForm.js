// Component that renders a single form element, to upload a file and
// handle initial validation.

import React from "react";
import Form from "react-bootstrap/Form";

export const FileUploadForm = ({
  onFileSelectSuccess,
  onFileUploadValidate,
}) => {
  // Validation of the selected file
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (onFileUploadValidate(file)) {
      // Call the parent method (where it gets stored into state and then
      // sent to the server) with the file as argument.
      onFileSelectSuccess(file);
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formUploadFile">
        <Form.Label>Select a file:</Form.Label>
        <Form.Control type="file" required onChange={handleFileInput} />
      </Form.Group>
    </Form>
  );
};

export default FileUploadForm;
