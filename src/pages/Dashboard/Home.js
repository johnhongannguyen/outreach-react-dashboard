import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Paper, Grid, Typography, Button } from "@material-ui/core";
import VolunteerRequestCard from "../../components/Dashboard/VolunteerRequestCard";
import ReliefCenterActionCard from "../../components/Dashboard/ReliefCenterActionCard";
import { Link } from "react-router-dom";
import NotificationCard from "../../components/Dashboard/NotificationCard";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  volunteerRequests: {
    backgroundColor: "#e0e0e0"
  }
}));

function FullWidthGrid() {
  const classes = useStyles();

  //Local State (Delete this Later)
  const [notifications, setNotifications] = useState([0, 1, 2, 3, 4, 5]);

  return (
    <Grid container className={classes.root} spacing={2}>
      {/* Volunteer Requests */}
      <Typography align="left" variant="h5" component="h3">
        Volunteer Requests
      </Typography>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid
            container
            justify="center"
            spacing={4}
            className={classes.volunteerRequests}
          >
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

            <Grid container justify="flex-end">
              <Link to="/dashboard/volunteers">
                <Button>See All..</Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Relief Centers - Action Needed */}
      <Grid item xs={12} lg={6}>
        <Typography align="left" variant="h5" component="h3">
          Relief Centers - Action Needed
        </Typography>
        <Paper className={classes.paper}>
          <Grid justify="center" container spacing={4}>
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
          </Grid>

          <Grid container justify="flex-end">
            <Link to="/dashboard/relief-centers">
              <Button>See All..</Button>
            </Link>
          </Grid>
        </Paper>
      </Grid>

      {/* Notifications (Alerts) */}
      <Grid item xs={12} lg={6}>
        <Typography variant="h5" component="h3">
          Notifications
        </Typography>
        <Paper className={classes.paper}>
          <Grid justify="center" container spacing={4}>
            {notifications.length < 0 ? (
              <Grid item>No New Notifications</Grid>
            ) : (
              notifications
                .filter(index => index < 4)
                .map(value => (
                  <Grid item>
                    <NotificationCard content="Really long test with the notication card" />
                  </Grid>
                ))
            )}
          </Grid>

          <Grid container justify="flex-end">
            <Link to="/dashboard/volunteers">
              <Button>See All..</Button>
            </Link>
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
