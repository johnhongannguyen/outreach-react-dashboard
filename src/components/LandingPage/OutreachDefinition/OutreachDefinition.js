import React, { useState } from "react";

// Importing Styles
import "./OutreachDefinition.css";

// Importing Typography component from material-ui
import Typography from "@material-ui/core/Typography";

import Logo from "./outreach-definition-shape.svg";

import Container from "@material-ui/core/Container";

export default function OutreachDefinition() {
  return (
    <div className="heading-container">
      {/* Heading of the component */}
      <div className="main-heading">
        <Typography variant="h6" className="sub-heading">
          What is
        </Typography>
        <Typography variant="h3" className="outheading-heading">
          Outreach?
        </Typography>
      </div>

      {/* Description of the component */}

      <div className="img-description">
        <img
          src={Logo}
          width={window.innerWidth / 3}
          className="background-container"
        />

        <div className="outreach-description">
          Outreach is a post disaster volunteer management application which
          connects volunteers to relief centers. You can volunteer and hence
          help people those who are affected by calamities.
        </div>
      </div>

      {/* <Container maxWidth="lg">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
        >
          Outreach is a post disaster volunteer management application which
          connects volunteers to relief centers. You can volunteer and hence
          help people those who are affected by calamities.
        </Typography>
      </Container> */}
    </div>
  );
}
