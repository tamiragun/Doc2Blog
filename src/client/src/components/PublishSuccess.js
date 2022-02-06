import React from "react";
import Card from "react-bootstrap/Card";

export const PublishSuccess = (fileName) => {
  // TODO generate button using routes instead of anchor link

  const blogUrl = `http://localhost:8080/convert?fileName=${fileName.fileName}`;

  return (
    <div className="upload-blogpost-card">
      <Card className="mx-auto" style={{ maxWidth: "30rem" }}>
        <Card.Header>
          <h3>Step 5: Admire</h3>
        </Card.Header>
        <Card.Body>
          <Card.Title>And you're done!</Card.Title>
          <Card.Text>
            You have successfully published your blog post. Clicking on this
            link will open your published blog post in another tab.
          </Card.Text>
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
