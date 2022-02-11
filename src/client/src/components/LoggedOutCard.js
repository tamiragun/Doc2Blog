import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Typewriter from "../images/typewriter.svg";
import { useNavigate } from "react-router";
import "./LoggedOutCard.css";

export const LoggedOutCard = ({ logoutText }) => {
  // Use navigate to be able to link to other Routes.
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="homepage-intro text-center mx-auto"
        style={{ maxWidth: "60rem" }}
      >
        <h2>Welcome to Doc2Blog!</h2>
        <figure>
          <Image
            fluid
            src={Typewriter}
            alt="Typewriter"
            style={{ width: "100%", height: "auto" }}
            className="img-fluid"
          ></Image>
        </figure>
        <p>
          Doc2Blog is a blog management tool that allows you to manage your blog
          post deadlines with handy reminders. It also lets you upload your
          posts in Microsoft Word or Open Source doc format. We perform a basic
          spellcheck for you and when you are happy with the version to publish,
          we convert it to HTML and publish it for you. Easy!
        </p>
      </div>
      <div className="authentication-buttons text-center">
        <Card
          className="mx-auto"
          style={{ maxWidth: "30rem", padding: "20px" }}
        >
          <Card.Title>{logoutText}</Card.Title>
          <Card.Body>
            <Button variant="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="primary" onClick={() => navigate("/register")}>
              Register
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LoggedOutCard;
