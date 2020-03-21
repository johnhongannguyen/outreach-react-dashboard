import React, { useState } from "react";

// Importing Styles
import "./OutreachDefinition.css";

// Importing Typography component from material-ui
import Typography from "@material-ui/core/Typography";

// Importing svg image
import Logo from "./outreach-definition-image.svg";

export default function OutreachDefinition() {
  return (
    // Div for heading, image and text
    <div className="heading-container">
      {/* Heading of the component */}
      <div className="main-heading">
        <Typography variant="h6" className="sub-heading">
          What is
        </Typography>
        <Typography variant="h3" className="outreach-heading">
          Outreach?
        </Typography>
      </div>

      {/* Description and svg image */}
      <div className="img-description">
        <div className="svg-container">
          <img
            src={Logo}
            width="600px"
            className="background-container"
            viewBox="0 0 60 100"
          />
        </div>

        {/* Description  */}
        <div className="outreach-description">
          Outreach is a post disaster volunteer management application which
          connects volunteers to relief centers. You can volunteer and hence
          help people those who are affected by calamities.
        </div>
      </div>
    </div>
  );
}
