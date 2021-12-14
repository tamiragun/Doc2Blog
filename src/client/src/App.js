// See https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react

import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import PublishSuccess from "./components/PublishSuccess";
import "./App.css";

function App() {
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
    fetch("/api", {
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
            setSelectedFileName(bodyText);
          });
        }
      )
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <form>
        <label htmlFor="myfile">Select a file:</label>
        <FileUpload
          id="myfile"
          onFileSelectSuccess={(file) => {
            setSelectedFile(file);
          }}
          onFileSelectError={({ error }) => alert(error)}
        ></FileUpload>
        {/* Only display upload button once a validated file is selected */}
        {selectedFile && <button onClick={submitForm}>Submit</button>}
        {/* Only display link to blog once published */}
        {selectedFileName && (
          <PublishSuccess fileName={selectedFileName}></PublishSuccess>
        )}
      </form>
    </div>
  );
}

export default App;
