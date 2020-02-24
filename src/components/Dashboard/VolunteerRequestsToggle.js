import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// Core Materila UI Imports
import { Grid, Button } from "@material-ui/core";

// Material UI Lab Imports

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0)
  }
}));

export default function VolunteerRequestsToggle() {
  const [alignment, setAlignment] = React.useState("left");
  const [formats, setFormats] = React.useState(() => ["bold"]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const classes = useStyles();

  return (
    <Grid item sm={6} md={6}>
      <ToggleButtonGroup
        value={alignment}
        className={classes.toggleContainer}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="all" aria-label="left aligned">
          <Button>All</Button>
        </ToggleButton>
        <ToggleButton value="oldest" aria-label="centered">
          <Button>Oldest</Button>
        </ToggleButton>
        <ToggleButton value="recent" aria-label="right aligned">
          <Button>Recent</Button>
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>
  );
}
