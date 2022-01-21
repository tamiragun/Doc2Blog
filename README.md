# Doc2Blog

## Introduction
As part of the HyperionDev graduate programme, we were asked to work a paired project. The brief called for an app that allows bloggers to keep track of their deadlines and upload blogposts as Word documents. It performs a basic spell check and also converts the post to HTML, ready to be published to the web.

## How to install this project

To install and run this programme on your local computer, you will need MySQL, JDE and JRE 17, Maven, Npm, and Node.js. 
* Clone the repository to your local computer.
* Navigate to the directory where you saved the repository.
* Inside the repository, start a terminal window.
* Type mvn install and wait for the process to run.
* Create a database in MySQL and adapt the database connections in the application.properties file to your new database. 
* Run the programme to stsrt up the server.
* Navigate to src/client.
* Type npm install and wait for the process to run.
* Now type npm start and wait for your browser to open a new window.
* You should now be able to use the app on your localhost browser window!

## Documentation

Visit this link to see our API documentation: http://localhost:8080/swagger-ui/#/. You can even test the API endpoints directly on this page.

## Acceptance criteria

This brief was provided by the fictional 'client', a group of journalists:

"We have observed that despite the availability of content management systems, many of them have still not addressed some of the problems faced in periodic publishing. Some of these problems concern deadlines, grammaticality, customisation, accessibility and discoverability. To help improve the situation, we would like you to publish blog articles. 

A lot more people are far more comfortable using a specialised word processor than the built-in word processor included in mainstream content management systems. Most word processors currently can produce documents in Word (DOCX) and OpenDocument Format (ODF). We would like you to allow bloggers to be able to submit OpenDocument and Word documents and publish them as web articles that can be viewed in the browser. If the documents contain hyperlinks to resources that can be embedded in the articles, you may safely embed the resources in the published article.

To ensure that bloggers stay on their respective schedules, we would like you to allow them to set regular deadlines for submitting their articles. They should also be able to set their how much time before the deadline they need to be reminded to submit their documents. They can also set multiple reminders. However, each reminder would require acknowledgement from the blogger before firing the next reminder if they have not yet submitted. If they miss a deadline, you may give them a friendly reminder that they have missed the deadline for their submission. Late submissions should be recognised as such.

You can safely assume that the audiences will most likely belong to the Commonwealth and thus be universally most comfortable with British English. To that end, we would like you to perform rudimentary spelling corrections and basic grammar checks upon submission. The blogger can simply be informed of a spelling correction and be required to rectify the grammatical errors. Once the grammatical errors are resolved, they can resubmit and the spellings will be corrected. For example, ‘analyze’ would be corrected to ‘analyse’.

Screen readers used by the blind should be to read your articles. That means we expect to use semantic HTML and other accessibility techniques. We also expect you to provide access to an up-to-date sitemap, RSS feed and metadata using RDF or other metadata frameworks for improved discoverability and accessibility. We would like you to provide stylesheets that the bloggers may reuse and documentation on the elements to select to define their own custom stylesheets. We would also like you to include guidelines on accessibility for the stylesheets and ensure that the stylesheets you provide are conformant."
