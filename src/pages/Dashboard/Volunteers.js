import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// Material UI - Core - Imports
import {
  Typography,
  Grid,
  Paper,
  Link,
  Button,
  Badge
} from "@material-ui/core";

// Custom Outreach Components
import VolunteerRequestsToggle from "../../components/Dashboard/VolunteerRequestsToggle";
import VolunteerRequestCard from "../../components/Dashboard/VolunteerRequestCard";

// Styles
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  // homeGrid: { backgroundColor: "#111C24" },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#111C24"
  },
  volunteerRequests: {
    // backgroundColor: "white"
  },
  hoverStyle: {
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    marginTop: "1rem",
    marginRight: "1rem",
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      transform: "scale(1.04)"
    }
  }
}));

export default function Volunteers() {
  const classes = useStyles();

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

      <Grid item xs={12} className={classes.homeGrid}>
        <Paper className={classes.paper}>
          <Grid
            container
            justify="flex-start"
            className={classes.volunteerRequests}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              // Removed the Filter from the Component used in the Dashboard's Home
              .map(value => (
                <Grid item className={classes.hoverStyle}>
                  <VolunteerRequestCard
                    title="Nikhil Wadekar"
                    content="has requested to volunteer for 2 days."
                  />
                </Grid>
              ))}

            <Grid container justify="flex-end">
              <Link to="/dashboard/volunteers">
                <Button>See All..</Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
