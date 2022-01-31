import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
      <Card>
        <Card.Body>
          <Card.Title>Draft uploaded and spell checked</Card.Title>
          {/* <Card.Subtitle className="mb-2 text-muted">
            Spell check complete
          </Card.Subtitle> */}
          <Card.Text>
            Preview your blogpost and check for any spelling or grammar
            mistakes:
          </Card.Text>
          <Card.Link
            href={blogUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-primary"
          >
            Preview spell checked post
          </Card.Link>
          <br></br>
          <br></br>
          <Card.Text>
            Either upload a corrected version, or continue with this version:
          </Card.Text>

          <Button variant="danger" onClick={handleUploadClick}>
            Upload a new version
          </Button>
          <Button variant="success" onClick={handlePublishClick}>
            Publish current version
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UploadSuccess;
