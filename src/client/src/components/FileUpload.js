import React from "react";
import Form from "react-bootstrap/Form";

export const FileUpload = ({ onFileUploadValidate, onFileSelectSuccess }) => {
  // Validate the selected file
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (onFileUploadValidate(file)) {
      // If validate, save the file to state
      onFileSelectSuccess(file);
    }
  };

  return (
    <div className="file-uploader">
      <Form.Control type="file" onChange={handleFileInput} />
    </div>
  );
};

export default FileUpload;
