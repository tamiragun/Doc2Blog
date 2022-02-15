import React from "react";
import Card from "react-bootstrap/Card";

export const UploadSuccess = ({ fileName }) => {
  // Set the url based on the current environment
  let blogUrl;
  if (process.env.NODE_ENV === "development") {
    blogUrl += `http://localhost:8080`;
  }
  blogUrl += `/check?fileName=${fileName}`;

  return (
    <Card.Link
      href={blogUrl}
      rel="noreferrer"
      target="_blank"
      className="btn btn-primary"
    >
      Preview spell checked post
    </Card.Link>
  );
};

export default UploadSuccess;
