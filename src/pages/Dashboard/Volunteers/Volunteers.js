import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

// Axios
import axios from "axios";

// Material UI - Core - Imports
import {
  Typography,
  Grid,
  Paper,
  Link,
  Button,
  Badge,
  ThemeProvider
} from "@material-ui/core";

// Custom Outreach Components
import VolunteerRequestsToggle from "../../../components/Dashboard/VolunteerRequestsToggle";
import VolunteerRequestCard from "../../../components/Dashboard/VolunteerRequestCard";

// ENV
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
      volunteerRequests: []
    };
  }

  // API Call
  fetchDataFromAPI = async relativePath => {
    await axios.get(`${API_URL}${relativePath}`).then(response => {
      this.setState({
        volunteerRequests: response.data
      });
    });
  };

  // Function to check if its the homepage
  isHomePage = () => this.props.location.pathname === "/dashboard/home";

  // When component
  componentDidMount() {
    this.fetchDataFromAPI("/user/admin/requests/received");

    // Set Limits based on where the user is
    if (this.isHomePage()) this.setState({ volunteerRequestsLimit: 4 });
    else this.setState({ volunteerRequestsLimit: 20 });
  }
  render() {
    const { classes, location } = this.props;
    const {
      volunteerRequests,
      notifications,
      volunteerRequestsLimit
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
            {volunteerRequests &&
              volunteerRequests
                .slice(0, volunteerRequestsLimit)
                .map(volunteerRequest => {
                  const {
                    name,
                    location,
                    relief_center_id,
                    date,
                    type,
                    start_time,
                    end_time,
                    volunteer_email
                  } = volunteerRequest;
                  return (
                    <Grid item className={classes.hoverStyle}>
                      <VolunteerRequestCard
                        email={volunteer_email}
                        content={`wants to help with ${type}`}
                        contentExtra={`at ${name} on ${date} from ${start_time} to ${end_time}`}
                        onAccept={"test"}
                        onDecline={"test"}
                      />
                    </Grid>
                  );
                })}

            <Grid container justify="flex-end">
              <Link to="/dashboard/volunteers">
                <Button>See All..</Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(Volunteers));
