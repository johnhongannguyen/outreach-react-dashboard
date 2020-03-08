import React, { useState } from "react";
import "./Features.css";
import { Typography, Paper, Badge } from "@material-ui/core";

export default function Features() {
  // Using State to store Features
  const [features, setFeatures] = useState([
    {
      id: 1,
      icon: "",
      name: "Volunteer Opportunities",
      description: "Find volunteering opportunities around you"
    },
    {
      id: 2,
      icon: "",
      name: "Filtered Results",
      description: "Filter the results based on your preferences"
    },
    {
      id: 3,
      icon: "",
      name: "Assign Volunteers",
      description: "Admins can assign volunteers to relief centers"
    },
    {
      id: 4,
      icon: "",
      name: "Volunteer Suggestions",
      description:
        "Admins will get volunteer suggestions when they try to assign the volunteers to relief centers"
    }
  ]);

  const classes = {
    root: {
      minWidth: 275
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  };

  return (
    <>
      {features.map(feature => {
        const { id, description, name } = feature;

        return (
          <Paper classes={classes} variant="outlined" key={id}>
            <Typography variant="h4" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {description}
            </Typography>
          </Paper>
        );
      })}

      <Badge badgeContent={4} color="primary">
        Notifications
      </Badge>
    </>
  );
}
