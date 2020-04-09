import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Material UI
import {
  Typography,
  IconButton,
  Button,
  TableRow,
  Paper,
  Grid,
  Link,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";

// Custom Components and Themes
import Suggestion from "../../../components/Dashboard/Suggestion";
import Theme from "../../../theme";
import VolunteerInfoCard from "../../../components/Dashboard/VolunteerInfoCard";
import VolunteerRequestCard from "../../../components/Dashboard/VolunteerRequestCard";

// Redux Connect
import { connect } from "react-redux";

// Web Sockets - Socket.io
import { clientSocket, adminSocket } from "../../../web-sockets";
import { apiCall } from "../../../api";

// API URL
const API_URL = process.env.REACT_APP_API_URL;

// Styles
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // backgroundColor: "#111C24"
  },
  requestsReceivedList: {
    // backgroundColor: "white"
  },
  hoverStyle: {
    transition: "1s cubic-bezier(.47,1.64,.41,.8)",
    marginTop: "1rem",
    marginRight: "1rem",
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
    },
  },
});

class RequestsSent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // reliefCenter: [],
      // suggestions: [],
      reliefCenterInfo: {},
      requestsReceivedList: [],
    };
  }

  // Get Relief Center by ID
  getReliefCenterByID = (reliefCenterID) => {
    apiCall(
      this.props.auth.token,
      `/relief-center/id/${reliefCenterID}`,
      "GET"
    ).then((response) => {
      this.setState({ reliefCenterInfo: response.data });
    });
  };

  // Approve Volunteer's Request
  approveVolunteerRequest = (taskID, emailID) => {
    apiCall(
      this.props.auth.token,
      `/relief-center/id/${taskID}/${emailID}`,
      "POST"
    ).then((response) => {
      if (response.status === 200) {
        this.getRequestsReceived(taskID);
      }
    });
  };

  // Decline Volunteer's Request
  declineVolunteerRequest = (taskID, emailID) => {
    apiCall(
      this.props.auth.token,
      `/relief-center/id/${taskID}/${emailID}/decline`,
      "POST"
    ).then((response) => {
      if (response.status === 200) {
        this.getRequestsReceived(taskID);
      }
    });
  };

  // Get Received Requests for the Task
  getRequestsReceived = (taskID) => {
    apiCall(
      this.props.auth.token,
      `/relief-center/task/${taskID}/requests_received`,
      "GET"
    ).then((res) => {
      if (res.status == 200) {
        this.setState({ requestsReceivedList: res.data });
      }
    });
  };

  componentDidMount() {
    const { reliefCenterID, taskID } = this.props.match.params;

    // Get Token from Redux
    const { token } = this.props.auth;

    // Set Token
    this.setState({ token });

    this.getReliefCenterByID(reliefCenterID);

    this.getRequestsReceived(taskID);

    clientSocket.on("reliefCenterDataChange", () => {
      this.getReliefCenterByID(reliefCenterID);

      this.getRequestsReceived(taskID);
    });
  }

  render() {
    // Styles
    const classes = styles;

    // Get Stuff from the state
    const { requestsReceivedList, reliefCenterInfo } = this.state;
    const { reliefCenterID, taskID } = this.props.match.params;

    return (
      <ThemeProvider theme={Theme}>
        {/* Back Arrow with Relief Center's Name */}
        <Typography variant="h5" align="left">
          <IconButton onClick={() => this.props.history.goBack()}>
            <ArrowBack />
          </IconButton>
          {`${reliefCenterInfo.name} > Requests Received` ||
            "Requests Received"}
        </Typography>

        {/* Box Starts */}
        <Paper className={classes.paper}>
          <Grid
            container
            justify="center"
            spacing={2}
            className={classes.requestsReceivedList}
          >
            {requestsReceivedList &&
              requestsReceivedList
                // .slice(0, assignedVolunteersLimit)
                .map((requestReceived) => {
                  const { _id, name, email } = requestReceived;
                  return (
                    <Grid item className={classes.hoverStyle}>
                      <VolunteerRequestCard
                        title={name}
                        content={email}
                        onAccept={() =>
                          this.approveVolunteerRequest(taskID, email)
                        }
                        onDecline={() =>
                          this.declineVolunteerRequest(taskID, email)
                        }
                      />
                    </Grid>
                  );
                })}
            {requestsReceivedList.length < 1 && (
              <div>No requests received for this task.</div>
            )}
          </Grid>
        </Paper>

        {/* Box Ends */}
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
)(withStyles(styles)(withRouter(RequestsSent)));
