import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "./StyleGuide.css";

export const StyleGuide = (props) => {
  return (
    <div className="style-guide-page">
      <h2>Style guide</h2>
      <p>
        Doc2Blog lets you upload your blogs in a word document, instead of
        having to type it up in your browser. This means you can already apply
        some of your own styling elements within the document, such as headers.
        In addition, you can choose between three style sheets to customise how
        those elements will look on the blog.
      </p>

      <h3>Doc2Blog style sheets</h3>
      <p>
        We do offer some cool styling options to make your blog post really
        shine! After you have uploaded and reviewed your post, you can choose
        between basic, bold, and sleek styling for your post. Here is a preview
        of the three style sheets:
      </p>
      <div className="style-examples">
        <CardGroup>
          <Card>
            <Card.Header as="h4">Basic</Card.Header>
            <Card.Body>
              <Card.Text>
                <h1
                  style={{
                    fontFamily: "Times New Roman",
                    fontWeight: "700",
                    fontSize: "32px",
                  }}
                >
                  Heading 1
                </h1>
                <h2
                  style={{
                    fontFamily: "Times New Roman",
                    fontWeight: "700",
                    fontSize: "24px",
                  }}
                >
                  Heading 2
                </h2>
                <h3
                  style={{
                    fontFamily: "Times New Roman",
                    fontWeight: "700",
                    fontSize: "18.72px",
                  }}
                >
                  Heading 3
                </h3>
                <h4
                  style={{
                    fontFamily: "Times New Roman",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  Heading 4
                </h4>
                <h5
                  style={{
                    fontFamily: "Times New Roman",
                    fontWeight: "700",
                    fontSize: "13.28px",
                  }}
                >
                  Heading 5
                </h5>
                <h6
                  style={{
                    fontFamily: "Times New Roman",
                    fontWeight: "700",
                    fontSize: "10.72px",
                  }}
                >
                  Heading 6
                </h6>
                <br></br>
                <p
                  style={{
                    fontFamily: "Times New Roman",
                    fontWeight: "500",
                    fontSize: "16",
                  }}
                >
                  Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                This is the default style. It features Times New Roman font, and
                will render safely on any browser.
              </small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Header as="h4">Bold</Card.Header>
            <Card.Body>
              <Card.Text>
                <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
                <h5>Heading 5</h5>
                <h6>Heading 6</h6>
                <br></br>
                <p>
                  Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                This style uses a sans-serif font that will adapt to the
                operating system being used to view your post.
              </small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Header as="h4">Sleek</Card.Header>
            <Card.Body>
              <Card.Text>
                <h1
                  style={{
                    fontFamily: "Garamond",
                    fontWeight: "700",
                    fontSize: "32px",
                    color: "DarkSlateGrey",
                  }}
                >
                  Heading 1
                </h1>
                <h2
                  style={{
                    fontFamily: "Garamond",
                    fontWeight: "700",
                    fontSize: "24px",
                    color: "DarkSlateGrey",
                  }}
                >
                  Heading 2
                </h2>
                <h3
                  style={{
                    fontFamily: "Garamond",
                    fontWeight: "700",
                    fontSize: "18.72px",
                    color: "DarkSlateGrey",
                  }}
                >
                  Heading 3
                </h3>
                <h4
                  style={{
                    fontFamily: "Garamond",
                    fontWeight: "700",
                    fontSize: "16px",
                    color: "DarkSlateGrey",
                  }}
                >
                  Heading 4
                </h4>
                <h5
                  style={{
                    fontFamily: "Garamond",
                    fontWeight: "700",
                    fontSize: "13.28px",
                    color: "DarkSlateGrey",
                  }}
                >
                  Heading 5
                </h5>
                <h6
                  style={{
                    fontFamily: "Garamond",
                    fontWeight: "700",
                    fontSize: "10.72px",
                    color: "DarkSlateGrey",
                  }}
                >
                  Heading 6
                </h6>
                <br></br>
                <p
                  style={{
                    fontFamily: "Garamond",
                    fontWeight: "500",
                    fontSize: "16",
                    color: "DarkSlateGrey",
                  }}
                >
                  Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                This style features the Garamond font family, for a more elegant
                look.
              </small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
      <h3>Ensuring your document is conform with our style guide</h3>
      <p>
        Although Microsoft Word and OpenFormat Documents allow you to insert
        different styles and elements directly, such as images and shapes,
        Doc2Blog does not support all formatting. Follow these guidelines to
        ensure that we can capture and convert your elements into one of the
        above styles.
      </p>
      <div className="supported-styles-lists">
        <ListGroup className="supported-styles-list">
          <ListGroup.Item variant="success">Supported styles</ListGroup.Item>
          <ListGroup.Item>Heading 1</ListGroup.Item>
          <ListGroup.Item>Heading 2</ListGroup.Item>
          <ListGroup.Item>Heading 3</ListGroup.Item>
          <ListGroup.Item>Heading 4</ListGroup.Item>
          <ListGroup.Item>Heading 5</ListGroup.Item>
          <ListGroup.Item>Heading 6</ListGroup.Item>
          <ListGroup.Item>Body</ListGroup.Item>
        </ListGroup>
        <ListGroup className="unsupported-styles-list">
          <ListGroup.Item variant="danger">Unsupported styles</ListGroup.Item>
          <ListGroup.Item>Figures</ListGroup.Item>
          <ListGroup.Item>Tables</ListGroup.Item>
          <ListGroup.Item>Footnotes</ListGroup.Item>
          <ListGroup.Item>Shapes</ListGroup.Item>
          <ListGroup.Item>Bold, italic, and underline</ListGroup.Item>
          <ListGroup.Item>Font sizes</ListGroup.Item>
          <ListGroup.Item>Different fonts</ListGroup.Item>
          <ListGroup.Item>
            Other styling provided by Word or OpenFormat
          </ListGroup.Item>
        </ListGroup>
      </div>

      <h3>Ensuring your document is accessible</h3>
      <p>
        To ensure that anyone can read your articles, there are a few things to
        take into account when writing your post and choosing styles. This will
        allow screen readers to navigate your blog post correctly.
      </p>
      <ul>
        <li>Don't create headings by using font size and bold.</li>
        <li>
          Instead, ensure that all your headings and subheadings are marked as
          headings using your word processors styles function.
        </li>
        <li>
          Your blog post title should be a Heading 1, and nothing else on your
          post should be a Heading 1.
        </li>
        <li>
          Similarly, try to follow the headings hierarchy within your post, as
          this is how the screen reader will recognise each section for what it
          is.
        </li>
      </ul>
    </div>
  );
};

export default StyleGuide;
