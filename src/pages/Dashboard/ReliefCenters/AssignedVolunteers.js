import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Material UI
import {
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
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

// Web Sockets - Socket.io
import { clientSocket, adminSocket } from "../../../web-sockets";

// Redux Connect
import { connect } from "react-redux";
import { apiCall } from "../../../api";

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
  assignedVolunteers: {
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

class AssignedVolunteers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // reliefCenter: [],
      // suggestions: [],
      reliefCenterInfo: {},
      assignedVolunteers: [],
    };
  }

  // Get Assigned Volunteers for the task
  getAssignedVolunteers = () => {
    const { reliefCenterID, taskID } = this.props.match.params;

    if (taskID)
      apiCall(
        this.props.auth.token,
        `/relief-center/task/${taskID}/assigned`,
        "GET"
      ).then((res) => {
        if (res.status == 200) {
          this.setState({ assignedVolunteers: res.data });
        }
      });
  };

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

  // Handle Opt Out (Unassign)
  handleOptOut = async (taskID, email) => {
    apiCall(
      this.props.auth.token,
      `/user/${email}/optout/${taskID}`,
      "POST"
    ).then((res) => {
      // If successfully opted out from DB..
      if (res.status == 200) {
        this.getAssignedVolunteers();
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

    this.getAssignedVolunteers();

    clientSocket.on("reliefCenterDataChange", () => {
      this.getReliefCenterByID(reliefCenterID);

      this.getAssignedVolunteers();
    });
  }

  render() {
    // Styles
    const classes = styles;

    // Get Stuff from the state
    const { assignedVolunteers, reliefCenterInfo } = this.state;
    const { reliefCenterID, taskID } = this.props.match.params;

    return (
      <ThemeProvider theme={Theme}>
        {/* Back Arrow with Relief Center's Name */}
        <Typography variant="h5" align="left">
          <IconButton onClick={() => this.props.history.goBack()}>
            <ArrowBack />
          </IconButton>
          {`${reliefCenterInfo.name} > Assigned Volunteers` ||
            "Assigned Volunteers"}
        </Typography>

        {/* Box Starts */}
        <Paper className={classes.paper}>
          <Grid
            container
            spacing={2}
            justify="center"
            className={classes.assignedVolunteers}
          >
            {assignedVolunteers &&
              assignedVolunteers
                // .slice(0, assignedVolunteersLimit)
                .map((assignedVolunteer) => {
                  const { _id, name, email } = assignedVolunteer;
                  return (
                    <Grid item className={classes.hoverStyle}>
                      <VolunteerInfoCard
                        title={name}
                        content={email}
                        buttonText="Unassign"
                        onButtonClick={() => this.handleOptOut(taskID, email)}
                      />
                    </Grid>
                  );
                })}
            {assignedVolunteers.length < 1 && <div>No Assigned Volunteers</div>}
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
)(withStyles(styles)(withRouter(AssignedVolunteers)));
