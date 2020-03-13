import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

// Axios
import axios from "axios";
import { Paper, Grid, Typography, Button, Badge } from "@material-ui/core";
import VolunteerRequestCard from "../../../components/Dashboard/VolunteerRequestCard";
import ReliefCenterActionCard from "../../../components/Dashboard/ReliefCenterActionCard";
import { Link } from "react-router-dom";
import NotificationCard from "../../../components/Dashboard/NotificationCard";
import Volunteers from "../Volunteers/Volunteers";
import ReliefCenters from "../ReliefCenters/ReliefCenters";

// ENV
const API_URL = process.env.REACT_APP_API_URL;

//     await fetchDataFromAPI("/relief-center");
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  // homeGrid: { backgroundColor: "#111C24" },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
    // backgroundColor: "#111C24"
  },
  volunteerRequests: {
    // backgroundColor: "white"
  },
  hoverStyle: {
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    marginTop: "1rem",
    marginRight: "1rem",
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
    }
  }
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: []
    };
  }

  render() {
    const { classes } = this.props;
    const { notifications } = this.state;
    return (
      <>
        <Grid container className={classes.root} spacing={2}>
          {/* Volunteer Requests */}
          <Grid item xs={12} className={classes.homeGrid}>
            <Volunteers />
          </Grid>

          {/* Relief Centers - Action Needed */}
          <Grid item xs={12} lg={6}>
            <ReliefCenters />
          </Grid>

          {/* Notifications (Alerts) */}
          <Grid item xs={12} lg={6}>
            <Typography variant="h5" align="left" component="h3">
              Notifications
            </Typography>
            <Paper className={classes.paper}>
              <Grid justify="center" container>
                {notifications.length < 0 ? (
                  <Grid item>No New Notifications</Grid>
                ) : (
                  notifications
                    .filter(index => index < 3)
                    .map(value => (
                      <Grid item className={classes.hoverStyle}>
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
      </>
    );
  }
}

export default withStyles(styles)(Home);
