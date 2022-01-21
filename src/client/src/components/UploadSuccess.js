import React from "react";

export const UploadSuccess = ({ fileName, onUploadNew, onPublish }) => {
  // TODO generate button using routes instead of anchor link

  const blogUrl = `http://localhost:8080/check?fileName=${fileName}`;

  const handleUploadClick = () => {
    onUploadNew();
  };

  const handlePublishClick = () => {
    onPublish();
  };

  return (
    <div className="upload-success">
      <h3>
        Preview your blogpost and check for any spelling or grammar mistakes:
      </h3>
      <a href={blogUrl} rel="noreferrer" target="_blank">
        Check spelling and grammar
      </a>
      <br></br>
      <br></br>
      <button onClick={handleUploadClick}>Upload a new version</button>
      <button onClick={handlePublishClick}>Publish current version</button>
    </div>
  );
};

export default UploadSuccess;
