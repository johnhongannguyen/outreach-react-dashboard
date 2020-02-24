import React from "react";

// Material UI - Core - Imports
import { Typography, Grid } from "@material-ui/core";
import VolunteerRequestsToggle from "../../components/Dashboard/VolunteerRequestsToggle";
export default function Volunteers() {
  return (
    <>
      <Grid item sm={6}>
        <Grid item sm={6}>
          <Typography gutterBottom variant="h6" align="left" component="h2">
            Accept requests from Volunteers
          </Typography>
        </Grid>

        <VolunteerRequestsToggle />
      </Grid>
    </>
  );
}
