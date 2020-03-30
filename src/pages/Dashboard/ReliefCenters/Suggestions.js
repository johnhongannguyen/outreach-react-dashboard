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
  Link
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";

// Custom Components and Themes
import Suggestion from "../../../components/Dashboard/Suggestion";
import Theme from "../../../theme";
import VolunteerInfoCard from "../../../components/Dashboard/VolunteerInfoCard";

// axios
import axios from "axios";

// Web Sockets - Socket.io
import { clientSocket, adminSocket } from "../../../web-sockets";

// API URL
const API_URL = process.env.REACT_APP_API_URL;

// Styles
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
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
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
    }
  }
});

class Suggestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // reliefCenter: [],
      // suggestions: [],
      reliefCenterInfo: {},
      suggestions: []
    };
  }

  // Get Relief Center by ID
  getReliefCenterByID = reliefCenterID => {
    axios
      .get(`${API_URL}/relief-center/id/${reliefCenterID}`)
      .then(response => {
        this.setState({ reliefCenterInfo: response.data });
        console.log(response);
      });
  };

  // Send Request to Volunteer
  sendRequestToVolunteer = (volunteerEmail, taskID) => {
    // Send Request with POST Request
    axios
      .post(`${API_URL}/user/admin/request/${volunteerEmail}/${taskID}`)
      .then(res => {
        if (res.status == 200) {
          // Change Button to Sent!; Suggest more if there's room.

          const { reliefCenterID } = this.props.match.params;

          this.getSuggestions();
        }
      })
      .catch(err => console.log(err));

    console.log(`Sending request to User:${volunteerEmail} for Task:${taskID}`);
  };

  // Get Suggestions for the Task
  getSuggestions = () => {
    const { taskID } = this.props.match.params;
    axios.get(`${API_URL}/user/suggest/task/${taskID}`).then(res => {
      if (res.status == 200) {
        this.setState({ suggestions: res.data });
      }
    });
  };

  componentDidMount() {
    const { reliefCenterID, taskID } = this.props.match.params;

    this.getReliefCenterByID(reliefCenterID);

    this.getSuggestions();
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
                .map(suggestedVolunteer => {
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

export default withStyles(styles)(withRouter(Suggestions));
