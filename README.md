# Doc2Blog

## Introduction
As part of the HyperionDev graduate programme, we were asked to work a paired project. The brief called for an app that allows bloggers to keep track of their deadlines and upload blogposts as Word documents. It performs a basic spell check and also converts the post to HTML, ready to be published to the web.

## How to use this app

Navigate to https://doc2blog.herokuapp.com/ to see this app in action. Follow the below steps, or watch this video, to see how it works:
### Logging in
* Create a profile by clicking "register".
* Log in with that profile
* Navigate to "Blog posts" in the navigation menu.

### Deadlines and reminders
* You can add blog post deadlines by clicking the "Add new deadline" button.
* Enter the topic and due date of your upcoming blogpost. You can also select if it is a recurring blog topic, or just a once-off.
* Set how far in advance you want to be reminded of your deadline, and how often you want those reminders to recur.
* Upon submit, your blog post deadline will appear in the table.
* To upload the corresponding post, click "upload draft".
* Once your draft is uploaded and published, you can click "mark published" next to the corresponding post, which removes that deadline from the table.
* Closer to the date, reminders will start popping up at the top of the page. Simply acknowledge them, and they will vanish.
* If you have set reminders to recur, they will only pop up again at the indicated interval, and if you have acknowledged the previous reminder.
* If your post is already behind on the due date, it will show up as red in the table.

### Uploading a blog post
* Click "upload draft" or navigate to "publish post" in the navigation menu, and follow the stepper:
* Use the form to select a document from your computer. It has to be a Word or Open Format document. CLick next.
* Select what style you would like your published post to have. Click next. **Tip:** You can read up about the different styleguide, as well as tips for your post, by navigating to the Style guide in the navigation menu.
* Click "Preview spell checked post", which opens your post in a new tab. The stylesheet won't be applied here yet, but you will see spelling errors highlighted in yellow.
* Close the tab and/or go back to the previous Doc2Bog tab you had open. You can either click "Back" to upload a new version of your blog post without those errors. Or you can click "Next" to proceed with publication.
* You are now published! Click on "View your blog post live" to see your blog post, styled, and public.
* CLick "Next" to go back to the overview of your deadlines.
* Mark your topic as published.
* Write a new blog post!

## How to install this project

To install and run this programme on your local computer, you will need PostgreSQL, JDE and JRE 17, Maven, Git, Npm, and Node.js.
1. Clone the repository to your local computer.
2. Navigate to the directory where you saved the repository.
3. Inside the repository, start a terminal window.
4. Type `mvn install` and wait for the process to run.
5. Create a database in PostgreSQL.
6. Add a user to that database and grant it all privileges on the database.
7. In your project folder, go to the config folder and create a new file called application.properties (no other suffix).
8. In that file, paste the contents of the application.properties.example file which is located in the same folder.
9. In your newly created config/application.properties file, adapt the database connections to your new database, username, and password.
10. Uncomment the line that says `spring.datasource.initialization-mode=always`.
11. In the terminal window where you ran `mvn install`, now type `git init`. This creates a Git repository.
12. A file called '.gitignore' will have been created in the root of your project folder. Open it and paste in it `/config/*` and on the next line `!/config/*.example`. This ensures that your database passwords are not published to GitHub, i.e. the world.
13. Run the programme from within your IDE to start up the server.
14. In the terminal window, navigate to the src/client folder within your project.
15. Type `npm install` and wait for the process to run.
16. Now type `npm start` and wait for your browser to open a new window.
17. Go back to the /config/application.properties file and comment out the `spring.datasource.initialization-mode=always` again. The script should have done its job and this line is no longer necessary unless you connect a new database.
18. You should now be able to use the app on your localhost browser window!
19. If you ever want to deploy this app, you'll first need to run `mvn clean install` in the terminal window in your project directory. This ensures that the frontend is built and then stored in the server's resources folder.

## Documentation

* To watch a video demo of our project, click here: https://www.loom.com/share/53350d4816ff42b2a15b161a362902c9
* To see our API documentation, visit this link after starting up the app's server: http://localhost:8080/swagger-ui/#/. You can even test the API endpoints directly on this page.
* You can have access to the entire repository of our project here: https://github.com/tamiragun/Doc2Blog

### Resources used
Several of the technologies and frameworks used in this app were new to us, so we got a little help from our friends over at Stackoverflow and Medium. A few special shout-outs:
- https://www.kantega.no/blogg/webapp-with-create-react-app-and-spring-boot
- https://devcenter.heroku.com/articles/deploying-spring-boot-apps-to-heroku
- https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react
- https://create-react-app.dev/docs/adding-custom-environment-variables/
- https://www.bezkoder.com/spring-boot-react-jwt-auth/

## Acceptance criteria

This brief was provided by the fictional 'client', a group of journalists:

"We have observed that despite the availability of content management systems, many of them have still not addressed some of the problems faced in periodic publishing. Some of these problems concern deadlines, grammaticality, customisation, accessibility and discoverability. To help improve the situation, we would like you to publish blog articles.

A lot more people are far more comfortable using a specialised word processor than the built-in word processor included in mainstream content management systems. Most word processors currently can produce documents in Word (DOCX) and OpenDocument Format (ODF). We would like you to allow bloggers to be able to submit OpenDocument and Word documents and publish them as web articles that can be viewed in the browser. If the documents contain hyperlinks to resources that can be embedded in the articles, you may safely embed the resources in the published article.

To ensure that bloggers stay on their respective schedules, we would like you to allow them to set regular deadlines for submitting their articles. They should also be able to set their how much time before the deadline they need to be reminded to submit their documents. They can also set multiple reminders. However, each reminder would require acknowledgement from the blogger before firing the next reminder if they have not yet submitted. If they miss a deadline, you may give them a friendly reminder that they have missed the deadline for their submission. Late submissions should be recognised as such.

You can safely assume that the audiences will most likely belong to the Commonwealth and thus be universally most comfortable with British English. To that end, we would like you to perform rudimentary spelling corrections and basic grammar checks upon submission. The blogger can simply be informed of a spelling correction and be required to rectify the grammatical errors. Once the grammatical errors are resolved, they can resubmit and the spellings will be corrected. For example, ‘analyze’ would be corrected to ‘analyse’.

Screen readers used by the blind should be to read your articles. That means we expect to use semantic HTML and other accessibility techniques. We also expect you to provide access to an up-to-date sitemap, RSS feed and metadata using RDF or other metadata frameworks for improved discoverability and accessibility. We would like you to provide stylesheets that the bloggers may reuse and documentation on the elements to select to define their own custom stylesheets. We would also like you to include guidelines on accessibility for the stylesheets and ensure that the stylesheets you provide are conformant."
