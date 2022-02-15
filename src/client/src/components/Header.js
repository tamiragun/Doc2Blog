import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

export const Header = ({ loggedIn, toggleLogin }) => {
  // Use navigate to be able to link to other Routes.
  const navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.removeItem("token");
    toggleLogin();
  };
  return (
    <header className="header-with-navbar">
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">Doc2Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }}
              >
                Blog posts
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/blogpost");
                }}
              >
                Publish post
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/style-guide");
                }}
              >
                Style guide
              </Nav.Link>
              {!loggedIn && (
                <Nav.Link
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Nav.Link>
              )}
              {!loggedIn && (
                <Nav.Link
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Nav.Link>
              )}
              {loggedIn && <Nav.Link onClick={handleClick}>Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
