import React from "react";
import Nav from "react-bootstrap/Nav";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="sticky-footer">
      <span className="text-muted copyright">Copyright &copy; 2022</span>
      <Nav.Link href="/sitemap.xml">Sitemap</Nav.Link>
      <Nav.Link href="/rss.xml">RSS Feed</Nav.Link>
    </div>
  );
};

export default Footer;
