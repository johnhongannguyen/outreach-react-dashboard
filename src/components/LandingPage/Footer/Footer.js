import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import outreachlogo from "../images/outreach_logo.png";

function Footer() {
  return (
    <div className="footer">
      <a href="/">
        <img src={outreachlogo} alt="Logo" className="footer-treespree-logo" />
      </a>
     
      <ul className="navigation">
        <li>
          <a href="/termsAndCondition">T&C</a>
        </li>
        <li>
          <a href="/team">Team</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/explore">Explore</a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
