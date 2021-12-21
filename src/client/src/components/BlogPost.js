import React, { useState } from "react";
import FileUpload from "./FileUpload";
import PublishSuccess from "./PublishSuccess";

const BlogPost = () => {
  // Keep track of the uploaded file
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);

  // Handler for when the submit button is clicked
  const submitForm = (e) => {
    // Prevent the browser form reloading
    e.preventDefault();

    // Add the file from the component's state into the request body
    const formData = new FormData();
    formData.append("file", selectedFile);
    // Set this empty variable so we can inspect the response stream in the event of a parsing error
    // Courtesy of https://support.stripe.com/questions/how-to-fix-syntaxerror-unexpected-token-in-json-at-position-0
    let responseClone;
    // Send the POST request to the server
    fetch("/convert", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // Clone the response object because response can only be read once
        responseClone = response.clone();
        return response.json();
      })
      // Obtain the filename and store it in state, so we can redirect to that endpoint later
      .then((data) => {
        responseClone.text().then(function (bodyText) {
          setSelectedFileName(bodyText);
        });
        return data;
      })
      .then(
        // Print the response if it can be parsed from JSON
        function (data) {
          console.log("Successfully uploaded: ", data);
        },
        // If not, print the error message and display the readable stream of teh response
        function (rejectionReason) {
          console.log(
            "Error parsing JSON from response:",
            rejectionReason,
            responseClone
          );
          responseClone.text().then(function (bodyText) {
            console.log(
              "Received the following instead of valid JSON:",
              bodyText
            );
            //setSelectedFileName(bodyText);
          });
        }
      )
      .catch((error) => {
        console.error(error);
      });
  };

  const setFileAndName = (file) => {
    setSelectedFile(file);
    let extension = file.name.slice(-3);
    console.log(extension);
    if (extension === "doc" || extension === "odt") {
      setSelectedFileName(file.name.slice(0, -4));
      console.log(file.name.slice(0, -4));
    } else if (extension === "ocx") {
      setSelectedFileName(file.name.slice(0, -5));
      console.log(file.name.slice(0, -5));
    }
  };

  return (
    <div className="App">
      <form>
        <label htmlFor="my-file">Select a file:</label>
        <FileUpload
          id="my-file"
          onFileSelectSuccess={setFileAndName}
          onFileSelectError={({ error }) => alert(error)}
        ></FileUpload>
        <button onClick={submitForm}>Submit</button>
        {/* Only display link to blog once published */}
        {selectedFileName && (
          <PublishSuccess fileName={selectedFileName}></PublishSuccess>
        )}
      </form>
    </div>
  );
};

export default BlogPost;
