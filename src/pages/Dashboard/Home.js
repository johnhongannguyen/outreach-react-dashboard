import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

// Axios
import axios from "axios";
import { Paper, Grid, Typography, Button, Badge } from "@material-ui/core";
import VolunteerRequestCard from "../../components/Dashboard/VolunteerRequestCard";
import ReliefCenterActionCard from "../../components/Dashboard/ReliefCenterActionCard";
import { Link } from "react-router-dom";
import NotificationCard from "../../components/Dashboard/NotificationCard";

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
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      volunteerRequests: [],
      notifications: [],
      reliefCenters: []
    };
  }

  // API Call
  fetchDataFromAPI = async relativePath => {
    await axios.get(`${API_URL}${relativePath}`).then(response => {
      this.setState({
        reliefCenters: response.data
      });
    });
  };

  // When component
  componentDidMount() {
    this.fetchDataFromAPI("/relief-center");
  }

  render() {
    const { classes } = this.props;
    const { reliefCenters, volunteerRequests, notifications } = this.state;
    return (
      <>
        <Grid container className={classes.root} spacing={2}>
          {/* Volunteer Requests */}
          <Grid item xs={12} className={classes.homeGrid}>
            <Typography align="left" variant="h5" component="h3">
              <Badge
                badgeContent={volunteerRequests && volunteerRequests.length}
                color="secondary"
              >
                Volunteer Requests
              </Badge>
            </Typography>
            <Paper className={classes.paper}>
              <Grid
                container
                justify="center"
                className={classes.volunteerRequests}
              >
                {reliefCenters &&
                  reliefCenters
                    // Bugs out when as it re-renders! Probably getting spliced everytime the app rerenders.
                    // use slice, NOT splice!
                    .slice(0, 5)
                    .map(reliefCenter => (
                      <div style={{ color: "white" }}>
                        {JSON.stringify(reliefCenter)}
                      </div>
                      // <Grid item className={classes.hoverStyle}>
                      //   <VolunteerRequestCard
                      //     title={`${request.name.first} ${request.name.last}`}
                      //     content={`wants to help with ${request.job.type}`}
                      //     onAccept={"test"}
                      //     onDecline={"test"}
                      //   />
                      // </Grid>
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
              <Grid justify="center" container>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                  .filter(index => index < 2)
                  .map(value => (
                    <Grid item className={classes.hoverStyle}>
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
