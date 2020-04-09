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
  suggestions: {
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

class Suggestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // reliefCenter: [],
      // suggestions: [],
      reliefCenterInfo: {},
      suggestions: [],
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

  // Send Request to Volunteer
  sendRequestToVolunteer = (volunteerEmail, taskID) => {
    // Send Request with POST Request

    apiCall(
      this.props.auth.token,
      `/user/admin/request/${volunteerEmail}/${taskID}`,
      "POST"
    )
      .then((res) => {
        if (res.status == 200) {
          // Change Button to Sent!; Suggest more if there's room.

          const { reliefCenterID } = this.props.match.params;

          this.getSuggestions();
        }
      })
      .catch((err) => console.log(err));
  };

  // Get Suggestions for the Task
  getSuggestions = () => {
    const { taskID } = this.props.match.params;

    apiCall(this.props.auth.token, `/user/suggest/task/${taskID}`, "GET").then(
      (res) => {
        if (res.status == 200) {
          this.setState({ suggestions: res.data });
        }
      }
    );
  };

  componentDidMount() {
    const { reliefCenterID, taskID } = this.props.match.params;

    // Get Token from Redux
    const { token } = this.props.auth;

    // Set Token
    this.setState({ token });

    this.getReliefCenterByID(reliefCenterID);

    this.getSuggestions();

    clientSocket.on("reliefCenterDataChange", () => {
      this.getReliefCenterByID(reliefCenterID);

      this.getSuggestions();
    });
  }

  render() {
    // Styles
    const classes = styles;

    // Get Stuff from the state
    const { suggestions, reliefCenterInfo } = this.state;
    const { reliefCenterID, taskID } = this.props.match.params;

    return (
      <ThemeProvider theme={Theme}>
        {/* Back Arrow with Relief Center's Name */}
        <Typography variant="h5" align="left">
          <IconButton onClick={() => this.props.history.goBack()}>
            <ArrowBack />
          </IconButton>
          {`${reliefCenterInfo.name} > Suggested Volunteers` ||
            "Suggested Volunteers"}
        </Typography>

        {/* Box Starts */}
        <Paper className={classes.paper}>
          <Grid
            container
            spacing={2}
            justify="center"
            className={classes.suggestions}
          >
            {suggestions &&
              suggestions
                // .slice(0, assignedVolunteersLimit)
                .map((suggestedVolunteer) => {
                  const { _id, name, email } = suggestedVolunteer;
                  return (
                    <Grid item className={classes.hoverStyle}>
                      <Suggestion
                        user={suggestedVolunteer}
                        taskID={taskID}
                        onSendRequestClick={this.sendRequestToVolunteer}
                      />
                    </Grid>
                  );
                })}
            {suggestions.length < 1 && <div>No Suggested Volunteers</div>}
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
)(withStyles(styles)(withRouter(Suggestions)));

// export default withStyles(styles)(withRouter(Suggestions));
