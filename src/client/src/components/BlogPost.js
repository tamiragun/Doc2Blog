// Component that renders the upload blog post page with a stepper

import React, { useState } from "react";
import FileUploadForm from "./FileUploadForm";
import PublishSuccess from "./PublishSuccess";
import UploadSuccess from "./UploadSuccess";
import BlogPublishStep from "./BlogPublishStep";
import ChooseStyling from "./ChooseStyling.js";
import { useNavigate } from "react-router";
import LoggedOutCard from "./LoggedOutCard.js";

const BlogPost = ({ loggedIn }) => {
  // Keep track of the uploaded file, style, and step
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [styleSheet, setStyleSheet] = useState("basic");
  const [step, setStep] = useState(1);

  // Use navigate to be able to link to other Routes.
  const navigate = useNavigate();

  // Handler for when the next step on stylesheet is clicked
  const submitUpload = async (event) => {
    // Prevent the browser form reloading
    event.preventDefault();
    // Some extra validation
    if (validateFileUpload(selectedFile)) {
      // Add the file from the component's state into the request body
      const formData = new FormData();
      formData.set("style", styleSheet);
      formData.set("file", selectedFile);
      const token = sessionStorage.getItem("token");

      // Send the POST request to the server
      try {
        const response = await fetch("/convert", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        //const jsonResponse = await response.json();
        // If there has been an error, set the error state hook to the error
        // message, which will then be displayed on the page.
        if (response.status !== 200) {
          console.log(response.statusText);
          //setIsError(jsonResponse.error_message);
        } else {
          // If successful, move on to the next step
          nextStep();
        }
      } catch (error) {
        console.log(error);
        //setIsError(error.error_message);
      }
    }
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

  // Function for going to the next step by increasing step state by 1
  const nextStep = () => {
    setStep(step + 1);
  };

  // Function for going to the previous step by decreasing step state by 1
  const prevStep = () => {
    setStep(step - 1);
  };

  // Helper function to ensure proper file input is given before proceeding
  const validateFileUpload = (file) => {
    // The programme can currently handle Word and open source documents
    const supportedFileTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/vnd.oasis.opendocument.text",
    ];

    if (!file) {
      alert("Please upload a .doc, .docx, or .odt file");
      return false;
    } else if (file.size > 1024000) {
      alert("File size cannot exceed 1MB");
      return false;
    } else if (!supportedFileTypes.includes(file.type)) {
      alert("File type should be .doc, .docx, or .odt");
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      {/*If the user is not logged in, display the login/registration options */}
      {!loggedIn && (
        <LoggedOutCard logoutText="Register or log in to upload a blog post:"></LoggedOutCard>
      )}
      {/*If the user is logged in, display the form upload stepper */}
      {loggedIn && (
        <div>
          <h2>Publish your blog post</h2>
          <p>
            Now that you have finished writing about your upcoming topic, it's
            time to share it with the world! Follow these steps to upload,
            spellcheck, style, and publish your post.
          </p>
          {/* Only display step 1 when step 1 is active*/}
          {step === 1 && (
            <BlogPublishStep
              header="Step 1: Upload document"
              title="Upload your draft blog post"
              text="Make sure your file is either a Microsoft Word document (ending in
              '.doc' or '.docx') or in OpenDocument Format (ending in '.odt')."
              // Render this step's component
              component={
                <FileUploadForm
                  onFileSelectSuccess={setFileAndName}
                  onFileUploadValidate={validateFileUpload}
                ></FileUploadForm>
              }
              // Navigating back goes to the blog post overview page
              handleBackClick={() => {
                navigate("/");
              }}
              // Navigating forward goes to the next step in the stepper
              handleNextClick={nextStep}
            ></BlogPublishStep>
          )}

          {/* Only display step 2 when step 2 is active*/}
          {step === 2 && (
            <BlogPublishStep
              header="Step 2: Choose style"
              title="Select your preferred stylesheet"
              text="Make sure your document is conform with our style guide. 
              You can choose which style sheet you'd like to publish your
              blog post with:"
              // Render this step's component
              component={
                <ChooseStyling
                  selectStyle={(style) => {
                    setStyleSheet(style);
                  }}
                ></ChooseStyling>
              }
              // Navigating back resets the selected file back to empty
              handleBackClick={() => {
                setSelectedFile(null);
                setSelectedFileName(null);
                prevStep();
              }}
              // Navigating forward calls the server with the file
              handleNextClick={submitUpload}
            ></BlogPublishStep>
          )}
          {/* Only display step 3 when step 3 is active*/}
          {step === 3 && (
            <BlogPublishStep
              header="Step 3: Review draft"
              title="Check your spelling and grammar"
              text="We've uploaded a preview of your html document, with any spelling
              issues highlighted. Clicking on this link will open the preview in
              a new tab. Once you are done reviewing your preview, close that
              tab and come back to this one to proceed.
              
              Clicking back will let you upload a new version, clicking next will 
              let you publish the current version (the highlights will disappear)."
              // Render this step's component
              component={
                <UploadSuccess fileName={selectedFileName}></UploadSuccess>
              }
              // Navigating back resets the selected stylesheet to basic
              handleBackClick={() => {
                setStyleSheet("basic");
                setStep(step - 1);
              }}
              // Navigating forward goes to the next step in the stepper
              handleNextClick={nextStep}
            ></BlogPublishStep>
          )}
          {/* Only display step 4 when step 4 is active*/}
          {step === 4 && (
            <BlogPublishStep
              header="Step 4: Admire"
              title="And you're done!"
              text="You have successfully published your blog post. Clicking on this
            link will open your published blog post in another tab.
            Don't forget to mark your deadline as complete :)"
              // Render this step's component
              component={
                <PublishSuccess fileName={selectedFileName}></PublishSuccess>
              }
              // Navigating back goes to the previous step in the stepper
              handleBackClick={prevStep}
              // Navigating forward goes to blogs overview page
              handleNextClick={() => {
                navigate("/");
              }}
            ></BlogPublishStep>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPost;
