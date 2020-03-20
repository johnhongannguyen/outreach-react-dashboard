import React from "react";
import "./Footer.css";
import outreachlogo from "../images/outreach_logo.png";
import { Button } from '@material-ui/core';

function Footer() {
  return (
    <div className="footer">
      <div className="news-letter-container">
             <span className="NewsLTitle"> Subscribe to our Newsletter</span>
             <div className="nl-subcontainer">
                <input type="text" name="nl_email" placeholder="EMAIL" />
                <Button
                    size="lg"
                    style={{ backgroundColor: "#F27821", color: "#fff" }}
                    variant=""
                    className="nl-btn"
                >
                    SUBSCRIBE
                </Button>
              </div> 
        </div>   
        {/* END OF news-letter-container div */}
   <div className="logo-nav-container">
      <a href="/">
        <img src={outreachlogo} alt="Logo" className="footer-outreach-logo" />
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
    </div>
    
  );
}

export default Footer;
