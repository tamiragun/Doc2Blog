import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./UploadSuccess.css";

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
    <div>
      <div className="upload-blogpost-card">
        <Card className="mx-auto" style={{ maxWidth: "30rem" }}>
          <Card.Header>
            <h3>Step 2: Review draft</h3>
          </Card.Header>
          <Card.Body>
            <Card.Title>Check your spelling and grammar</Card.Title>
            <Card.Text>
              We've uploaded a preview of your html document, with any spelling
              issues highlighted. Clicking on this link will open the preview in
              a new tab. Once you are done reviewing your preview, close that
              tab and come back to this one to proceed.
            </Card.Text>
            <Card.Link
              href={blogUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-primary"
            >
              Preview spell checked post
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
      <div className="upload-blogpost-card">
        <Card className="mx-auto" style={{ maxWidth: "30rem" }}>
          <Card.Header>
            <h3>Step 3: Confirm version</h3>
          </Card.Header>
          <Card.Body>
            <Card.Title>Revert or continue?</Card.Title>
            <Card.Text>
              If you'd like to upload a new draft, clicking the button will take
              you back to the previous step. If you're happy with your preview,
              click publish to go to the next step.
            </Card.Text>
            <div className="upload-or-publish-buttons">
              <Button
                className="upload-new-button"
                variant="secondary"
                onClick={handleUploadClick}
              >
                Upload a new version
              </Button>
              <Button
                className="continue-publishing-button"
                variant="primary"
                onClick={handlePublishClick}
              >
                Publish current version
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default UploadSuccess;
