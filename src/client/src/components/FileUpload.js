import React from "react";

export const FileUpload = ({ onFileSelectError, onFileSelectSuccess }) => {
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
      onFileSelectError({ error: "Please upload a .doc, .docx, or .odt file" });
    } else if (file.size > 1024000) {
      onFileSelectError({ error: "File size cannot exceed 1MB" });
    } else if (!supportedFileTypes.includes(file.type)) {
      onFileSelectError({ error: "File type should be .doc, .docx, or .odt" });
    } else {
      onFileSelectSuccess(file);
    }
  };

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileInput}></input>
    </div>
  );
};

export default FileUpload;
