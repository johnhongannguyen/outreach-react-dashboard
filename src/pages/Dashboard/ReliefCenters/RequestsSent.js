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
  requestsSentList: {
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

class RequestsSent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // reliefCenter: [],
      // suggestions: [],
      reliefCenterInfo: {},
      requestsSentList: []
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

  // Handle Revoke Request
  handleRevokeRequest = (taskID, email) => {
    // const { reliefCenterID, taskID } = this.props.match.params;
    if (taskID)
      axios.post(`${API_URL}/user/${email}/decline/${taskID}`).then(res => {
        if (res.status == 200) {
          this.getRequestsSent(taskID);
        }
      });
  };

  // Get Requests Sent for the task
  getRequestsSent = taskID => {
    axios
      .get(`${API_URL}/relief-center/task/${taskID}/requests_sent`)
      .then(res => {
        if (res.status == 200) {
          this.setState({ requestsSentList: res.data });
        }
      });
  };

  componentDidMount() {
    const { reliefCenterID, taskID } = this.props.match.params;

    this.getReliefCenterByID(reliefCenterID);

    this.getRequestsSent(taskID);
  }

  render() {
    // Styles
    const classes = styles;

    // Get Stuff from the state
    const { requestsSentList, reliefCenterInfo } = this.state;
    const { reliefCenterID, taskID } = this.props.match.params;

    return (
      <ThemeProvider theme={Theme}>
        {/* Back Arrow with Relief Center's Name */}
        <Typography variant="h5" align="left">
          <IconButton onClick={() => this.props.history.goBack()}>
            <ArrowBack />
          </IconButton>
          {`${reliefCenterInfo.name} > Requests Sent` || "Requests Sent"}
        </Typography>

        {/* Box Starts */}
        <Paper className={classes.paper}>
          <Grid
            container
            justify="center"
            spacing={2}
            className={classes.requestsSentList}
          >
            {requestsSentList &&
              requestsSentList
                // .slice(0, assignedVolunteersLimit)
                .map(assignedVolunteer => {
                  const { _id, name, email } = assignedVolunteer;
                  return (
                    <Grid item className={classes.hoverStyle}>
                      <VolunteerInfoCard
                        title={name}
                        content={email}
                        buttonText="Revoke Request"
                        onButtonClick={() =>
                          this.handleRevokeRequest(taskID, email)
                        }
                      />
                    </Grid>
                  );
                })}
            {requestsSentList.length < 1 && <div>No Requests Sent</div>}
          </Grid>
        </Paper>

        {/* Box Ends */}
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(withRouter(RequestsSent));
