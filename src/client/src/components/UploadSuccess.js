import React from "react";
import Card from "react-bootstrap/Card";

export const UploadSuccess = ({ fileName }) => {
  // TODO generate button using routes instead of anchor link

  const blogUrl = `http://localhost:8080/check?fileName=${fileName}`;

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
