import React from "react";
import Card from "react-bootstrap/Card";

export const PublishSuccess = ({ fileName }) => {
  // Set the url based on the current environment
  let blogUrl;
  if (process.env.NODE_ENV === "development") {
    blogUrl += `http://localhost:8080`;
  }
  blogUrl += `/convert?fileName=${fileName}`;

  return (
    <Card.Link
      href={blogUrl}
      rel="noreferrer"
      target="_blank"
      className="btn btn-primary"
    >
      View your blog post live
    </Card.Link>
  );
};

export default PublishSuccess;
