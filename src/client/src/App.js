// See https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react

import FileUpload from "./components/FileUpload";
import './App.css';
import React, { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

    // Handler for when the submit button is cliked
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
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        ></FileUpload>
        <button onClick={submitForm}>Submit</button>
      </form>
    </div>
  );
}

export default App;
