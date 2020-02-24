import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Paper, Grid, Typography } from "@material-ui/core";
import VolunteerRequestCard from "../../components/Dashboard/VolunteerRequestCard";
import ReliefCenterActionCard from "../../components/Dashboard/ReliefCenterActionCard";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function FullWidthGrid() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      {/* Volunteer Requests */}
      <Typography align="left" variant="h5" component="h3">
        Volunteer Requests
      </Typography>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={4}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              .filter(index => index < 4)
              .map(value => (
                <Grid item>
                  <VolunteerRequestCard
                    title="Nikhil Wadekar"
                    content="has requested to volunteer for 2 days."
                  />
                </Grid>
              ))}

            <Grid item>See All..</Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Relief Centers - Action Needed */}
      <Grid item lg={6}>
        <Typography align="left" variant="h5" component="h3">
          Relief Centers - Action Needed
        </Typography>
        <Paper className={classes.paper}>
          <Grid container spacing={4}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              .filter(index => index < 2)
              .map(value => (
                <Grid item>
                  <ReliefCenterActionCard
                    name="Relief Center Name"
                    list={<div>list</div>}
                  />
                </Grid>
              ))}

            <Grid item>
              <Typography align="left">See All..</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Notifications (Alerts) */}
      <Grid item xs={6}>
        <Typography variant="h5" component="h3">
          Notifications
        </Typography>
        <Paper className={classes.paper}>
          <Grid container spacing={4}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              .filter(index => index < 4)
              .map(value => (
                <Grid item></Grid>
              ))}

            <div>See all..</div>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default function Home() {
  return (
    <>
      <FullWidthGrid />
    </>
  );
}
