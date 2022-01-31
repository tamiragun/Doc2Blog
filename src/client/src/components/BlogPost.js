import React, { useState } from "react";
import FileUpload from "./FileUpload";
import PublishSuccess from "./PublishSuccess";
import UploadSuccess from "./UploadSuccess";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const BlogPost = () => {
  // Keep track of the uploaded file
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [published, setPublished] = useState(false);

  // Handler for when the submit button is clicked
  const submitForm = (e) => {
    // Prevent the browser form reloading
    e.preventDefault();

    // Add the file from the component's state into the request body
    const formData = new FormData();
    formData.append("file", selectedFile);

    // Send the POST request to the server
    fetch("/convert", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        setUploaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handler for when the file is selected (but not yet uploaded)
  const setFileAndName = (file) => {
    // Store the file in state
    setSelectedFile(file);

    // Store the name in state
    // To do so, find out which of the 3 extensions it has and truncate the filename accordingly
    let extension = file.name.slice(-3);
    if (extension === "doc" || extension === "odt") {
      setSelectedFileName(file.name.slice(0, -4));
    } else if (extension === "ocx") {
      setSelectedFileName(file.name.slice(0, -5));
    }
  };

  // Handler for when the user wants to upload a new file. Resets everything to null.
  const uploadNewFile = () => {
    setUploaded(false);
    setSelectedFile(null);
    setSelectedFileName(null);
  };

  // Handler for when the user publishes their post.
  // This removes the upload and spellcheck from display and now only displays the final link
  const publishBlog = () => {
    setPublished(true);
    setUploaded(false);
  };

  return (
    <div>
      {/* Only display form when no doc is uploaded or published*/}
      {!uploaded && !published && (
        <Form>
          <Form.Group className="mb-3" controlId="formUploadFile">
            <Form.Label>Select a file:</Form.Label>
            <FileUpload
              id="my-file"
              onFileSelectSuccess={setFileAndName}
              onFileSelectError={({ error }) => alert(error)}
            ></FileUpload>
          </Form.Group>

          <Button variant="primary" onClick={submitForm}>
            Upload
          </Button>
        </Form>
      )}

      {/* Only display link to draft once uploaded */}
      {uploaded && (
        <UploadSuccess
          fileName={selectedFileName}
          onUploadNew={uploadNewFile}
          onPublish={publishBlog}
        ></UploadSuccess>
      )}

      {/* Only display link to blog once published */}
      {published && (
        <PublishSuccess fileName={selectedFileName}></PublishSuccess>
      )}
    </div>
  );
};

export default BlogPost;
