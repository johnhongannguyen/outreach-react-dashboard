import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";

// Material UI - Core - Imports
import {
  Typography,
  Grid,
  Paper,
  Button,
  Badge,
  ThemeProvider,
} from "@material-ui/core";

// Custom Outreach Components
import VolunteerRequestCard from "../../../components/Dashboard/VolunteerRequestCard";

// Web Sockets - Socket.io
import { clientSocket, adminSocket } from "../../../web-sockets";

// Custom Components and Themes
import Theme from "../../../theme";

// Moment!
import moment from "moment";

// Redux Connect
import { connect } from "react-redux";

// API Call
import { apiCall } from "../../../api";

// Styles
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    // textAlign: "center",

    padding: 15,
    // color: theme.palette.text.secondary
    // backgroundColor: "#111C24"
  },
  seeAllButton: {
    textTransform: "none",
    textDecoration: "none",
  },

  volunteerRequests: {
    // backgroundColor: "white"
  },
  hoverStyle: {
    transition: "1s cubic-bezier(.47,1.64,.41,.8)",
    marginTop: "1rem",
    // marginRight: "1rem",
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
    },
  },
});

class Volunteers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      volunteerRequests: [],
    };
  }

  // API Call
  getDataFromAPI = async () => {
    await apiCall(this.props.auth.token, `/user/admin/requests/received`, "GET")
      .then((response) => {
        this.setState({
          volunteerRequests: response.data,
        });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  // Function to check if its the homepage
  isHomePage = () => this.props.location.pathname === "/dashboard/";

  // When component
  componentDidMount() {
    // Get Token from Redux
    const { token } = this.props.auth;

    // Set Token
    this.setState({ token });

    this.getDataFromAPI();

    clientSocket.on("reliefCenterDataChange", () => {
      // Get the latest changes
      this.getDataFromAPI();
    });

    // Set Limits based on where the user is
    if (this.isHomePage()) this.setState({ volunteerRequestsLimit: 3 });
    else this.setState({ volunteerRequestsLimit: 20 });
  }

  approveVolunteerRequest = (taskID, emailID) => {
    apiCall(
      this.state.token,
      `/relief-center/id/${taskID}/${emailID}`,
      "POST"
    ).then((response) => {
      const updatedVolunteerRequests = this.state.volunteerRequests.filter(
        (volunteerRequest) => volunteerRequest.volunteer_email !== emailID
      );

      if (response.status === 200)
        this.setState({ volunteerRequests: updatedVolunteerRequests });
    });
  };

  // Decline Volunteer's Request
  declineVolunteerRequest = (taskID, emailID) => {
    apiCall(
      this.state.token,
      `/relief-center/id/${taskID}/${emailID}/decline`,
      "POST"
    ).then((response) => {
      const updatedVolunteerRequests = this.state.volunteerRequests.filter(
        (volunteerRequest) => volunteerRequest.volunteer_email !== emailID
      );

      if (response.status === 200)
        this.setState({ volunteerRequests: updatedVolunteerRequests });
    });
  };

  render() {
    const { classes, location } = this.props;
    const {
      volunteerRequests,
      notifications,
      volunteerRequestsLimit,
    } = this.state;

    return (
      <ThemeProvider theme={Theme}>
        <Typography
          align="left"
          variant="h4"
          component="h3"
          style={{ marginBottom: "0.5rem", marginTop: "1rem" }}>
          <Badge
            badgeContent={volunteerRequests && volunteerRequests.length}
            color="primary">
            Volunteer Requests
          </Badge>
        </Typography>

        <Paper className={classes.paper}>
          <Grid
            spacing={2}
            container
            justify="space-evenly"
            className={classes.volunteerRequests}>
            {volunteerRequests &&
              volunteerRequests
                .slice(0, volunteerRequestsLimit)
                .map((volunteerRequest) => {
                  const {
                    name,
                    location,
                    relief_center_id,
                    task_id,
                    date,
                    type,
                    start_time,
                    end_time,
                    volunteer_email,
                    volunteer_name,
                  } = volunteerRequest;
                  return (
                    <Grid item xs={12} md={6} lg={4}>
                      <VolunteerRequestCard
                        className={classes.hoverStyle}
                        title={volunteer_name}
                        // content={`wants to help with ${type}`}
                        content={`${type} - ${name}`}
                        contentExtra={
                          date
                            ? `${moment(date).format("MM-DD-YYYY")} | ${moment(
                                start_time
                              ).format("hh:MM A")} - ${moment(end_time).format(
                                "hh:MM A"
                              )}`
                            : "Needed at: Any time"
                        }
                        onAccept={() => {
                          this.approveVolunteerRequest(
                            task_id,
                            volunteer_email
                          );
                        }}
                        onDecline={() =>
                          this.declineVolunteerRequest(task_id, volunteer_email)
                        }
                      />
                    </Grid>
                  );
                })}
            {volunteerRequests.length < 1 && (
              <Grid
                container
                justify="center"
                align="center"
                style={{ minHeight: 200 }}>
                <Grid item>
                  <Typography>No New Requests</Typography>
                </Grid>
              </Grid>
            )}
            {this.isHomePage() && (
              <Grid container justify="flex-end">
                <Link to="/dashboard/volunteers">
                  <Button className={classes.seeAllButton}>See all..</Button>
                </Link>
              </Grid>
            )}
          </Grid>
        </Paper>
      </ThemeProvider>
    );
  }
}

// Redux - Map (Redux) State -> props
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(withRouter(Volunteers)));
