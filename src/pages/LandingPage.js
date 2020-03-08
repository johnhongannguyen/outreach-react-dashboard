import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Typography, Container } from "@material-ui/core";

// Get Components
import OutreachDefinition from "../components/LandingPage/OutreachDefinition/OutreachDefinition";

// Landing Page
export default function LandingPage() {
  const classes = useStyles();

  return (
    <Container classes={classes} maxWidth="lg">
      {/* Top Section */}

      <Typography variant="h3">What is Outreach?</Typography>

      <OutreachDefinition />
    </Container>
  );
}

// Styles

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
