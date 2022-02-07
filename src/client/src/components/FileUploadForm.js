import React from "react";
import Form from "react-bootstrap/Form";

export const FileUploadForm = ({ onFileSelectSuccess, onFileSelectError }) => {
  // The programme can currently handle Word and open source documents
  const supportedFileTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/vnd.oasis.opendocument.text",
  ];

  // Validation of the selected file
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) {
      onFileSelectError("Please upload a .doc, .docx, or .odt file");
    } else if (file.size > 1024000) {
      onFileSelectError("File size cannot exceed 1MB");
    } else if (!supportedFileTypes.includes(file.type)) {
      onFileSelectError("File type should be .doc, .docx, or .odt");
    } else {
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
