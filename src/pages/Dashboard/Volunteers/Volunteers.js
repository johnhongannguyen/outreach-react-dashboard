import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import axios from "axios"; // Axios

// Material UI - Core - Imports
import {
  Typography,
  Grid,
  Paper,
  Button,
  Badge,
  Zoom
} from "@material-ui/core";

// Custom Outreach Components
import VolunteerRequestCard from "../../../components/Dashboard/VolunteerRequestCard";

var clientSocket = require("socket.io-client")("http://localhost:5000/");

const API_URL = process.env.REACT_APP_API_URL;

// Styles
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
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      transform: "scale(1.04)"
    }
  }
});

class Volunteers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      volunteerRequests: [],
      reliefCenters: []
    };
  }

  // API Call
  getDataFromAPI = async relativePath => {
    await axios
      .get(`${API_URL}${relativePath}`)
      .then(response => {
        this.setState({
          volunteerRequests: response.data
        });
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  };

  // Function to check if its the homepage
  isHomePage = () => this.props.location.pathname === "/dashboard/home";

  //  Get Volunteer Request! Received from Volunteers!
  getVolunteerRequests = () => {
    this.getDataFromAPI("/user/admin/requests/received");
  };

  // When component
  componentDidMount() {
    // Get Data on Component Mount
    this.getVolunteerRequests();

    // Listen to Relief Center data changes, if anything does change.. get the latest volunteer requests!
    clientSocket.on("reliefCenterDataChange", data => {
      this.getVolunteerRequests();
    });

    // Set Limits based on where the user is
    if (this.isHomePage()) this.setState({ volunteerRequestsLimit: 4 });
    else this.setState({ volunteerRequestsLimit: 20 });
  }

  approveVolunteerRequest = async (taskID, emailID) => {
    await axios
      .post(`${API_URL}/relief-center/id/${taskID}/${emailID}`)
      .then(response => {
        const updatedVolunteerRequests = this.state.volunteerRequests.filter(
          volunteerRequest => volunteerRequest.task_id != taskID
        );

        if (response.status == 200)
          this.setState({ volunteerRequests: updatedVolunteerRequests });
      });
  };

  render() {
    const { classes, location } = this.props;
    const {
      volunteerRequests,
      notifications,
      volunteerRequestsLimit,
      newData
    } = this.state;

    return (
      <>
        <Typography align="left" variant="h5" component="h3">
          <Badge
            badgeContent={volunteerRequests && volunteerRequests.length}
            color="secondary"
          >
            Volunteer Requests:
          </Badge>
        </Typography>

        <Paper className={classes.paper}>
          <Grid
            container
            justify="center"
            className={classes.volunteerRequests}
          >
            {volunteerRequests.length > 0 &&
              volunteerRequests
                .slice(0, volunteerRequestsLimit)
                .map((volunteerRequest, index) => {
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
                    volunteer_name
                  } = volunteerRequest;
                  return (
                    <Zoom in>
                      <Grid key={index} item className={classes.hoverStyle}>
                        <VolunteerRequestCard
                          title={volunteer_name}
                          content={`wants to help with ${type}`}
                          contentExtra={`at ${name} on ${date} from ${start_time} to ${end_time}`}
                          onAccept={() => {
                            this.approveVolunteerRequest(
                              task_id,
                              volunteer_email
                            );
                          }}
                          onDecline={"test"}
                        />
                      </Grid>
                    </Zoom>
                  );
                })}
            {volunteerRequests.length < 1 && <div>No New notifications</div>}
            {this.isHomePage() && (
              <Grid container justify="flex-end">
                <Link to="/dashboard/volunteers">
                  <Button>See All..</Button>
                </Link>
                <Button
                  onClick={() =>
                    this.getDataFromAPI("/user/admin/requests/received")
                  }
                >
                  Refresh
                </Button>
              </Grid>
            )}
          </Grid>

          <Grid container justify="flex-end">
            <div>{JSON.stringify(newData)}</div>
          </Grid>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(Volunteers));
