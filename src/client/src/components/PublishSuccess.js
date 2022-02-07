import React from "react";
import Card from "react-bootstrap/Card";

export const PublishSuccess = ({ fileName }) => {
  // TODO generate button using routes instead of anchor link

  const blogUrl = `http://localhost:8080/convert?fileName=${fileName}`;

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
