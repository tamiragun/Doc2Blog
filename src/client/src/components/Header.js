import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

export const Header = ({ loggedIn, toggleLogin }) => {
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
              <Nav.Link href="/">Blog posts</Nav.Link>
              <Nav.Link href="/blogpost">Publish post</Nav.Link>
              <Nav.Link href="/style-guide">Style guide</Nav.Link>
              {!loggedIn && <Nav.Link href="/register">Register</Nav.Link>}
              {!loggedIn && <Nav.Link href="/login">Login</Nav.Link>}
              {loggedIn && <Nav.Link onClick={handleClick}>Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
