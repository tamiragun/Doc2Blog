import React from "react";
import Card from "react-bootstrap/Card";

export const PublishSuccess = (fileName) => {
  // TODO generate button using routes instead of anchor link

  const blogUrl = `http://localhost:8080/convert?fileName=${fileName.fileName}`;

  return (
    <div className="publish-success">
      <Card>
        <Card.Body>
          <Card.Title>
            You have successfully published your blog post!
          </Card.Title>
          <Card.Link
            href={blogUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-primary"
          >
            View your blog post live
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PublishSuccess;
