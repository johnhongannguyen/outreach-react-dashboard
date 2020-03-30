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
  Paper
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";

// Custom Components and Themes
import Suggestion from "../../../components/Dashboard/Suggestion";
import Theme from "../../../theme";

// axios
import axios from "axios";

// Web Sockets - Socket.io
import { clientSocket, adminSocket } from "../../../web-sockets";

// API URL
const API_URL = process.env.REACT_APP_API_URL;

const styles = theme => ({
  table: {
    minWidth: 650
  },
  suggestion: {
    maxWidth: 20,
    padding: 10,
    margin: 10
  }
});

class AssignVolunteers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reliefCenter: [],
      suggestions: [],
      reliefCenterInfo: {}
    };
  }

  // Get Relief Center by ID
  getReliefCenterByID = reliefCenterID => {
    console.log(
      `${API_URL}/relief-center/id/${reliefCenterID}/requirement/assign`
    );
    axios
      .get(`${API_URL}/relief-center/id/${reliefCenterID}/requirement/assign`)
      .then(response => {
        this.setState({ reliefCenter: response.data });
        console.log(response);
      });

    axios
      .get(`${API_URL}/relief-center/id/${reliefCenterID}`)
      .then(response => {
        this.setState({ reliefCenterInfo: response.data });
        console.log(response);
      });
  };

  // Get Suggestions For a Task
  // getSuggestionsForATask = async taskID => {
  //   const suggestions = await axios.get(
  //     `${API_URL}/user/suggest/task/${taskID}`
  //   );

  //   console.log(suggestions.data[0]);
  //   this.setState({ suggestions: suggestions.data });
  //   return suggestions.data[0];
  // };

  // Get Suggestions
  getSuggestions = async number => {
    const suggestions = await axios.get(`${API_URL}/user/suggest/`);
    this.setState({ suggestions: suggestions.data });
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

          console.log("Done!");
          this.getReliefCenterByID(reliefCenterID);
        }
      })
      .catch(err => console.log(err));

    console.log(`Sending request to User:${volunteerEmail} for Task:${taskID}`);
  };

  // Suggest ONE user from suggestions
  suggestUser(taskID, assigned, requestsSentByAdmin, volunteerRequests) {
    let { suggestions } = this.state;

    // Filter Suggestions (We don't need users that are/have assigned, requests, requested etc.)
    const filteredSuggestions = suggestions.filter(suggestion => {
      const { email } = suggestion;

      // Suggestion should not exist in any of: Assigned, Request Received, Request Sent
      return (
        !assigned.includes(email) &&
        !requestsSentByAdmin.includes(email) &&
        !volunteerRequests.includes(email)
      );
    });

    // Return one of filtered Suggestions Randomly!

    if (!!filteredSuggestions.length)
      return filteredSuggestions[
        Math.floor(Math.random() * filteredSuggestions.length)
      ];
    else return { name: "No Suggestions", email: "" };
  }

  // Get Assigned Volunteers
  getAssigned = taskID => {
    const { reliefCenterID } = this.props.match.params;
    this.props.history.push(
      `/dashboard/relief-center/id/${reliefCenterID}/task/${taskID}/assigned`
    );
  };

  // Get Pending Requests to be accepted by Volunteers
  getPendingRequests = taskID => {
    const { reliefCenterID } = this.props.match.params;

    this.props.history.push(
      `/dashboard/relief-center/id/${reliefCenterID}/task/${taskID}/pending`
    );
  };

  // Get Requests Received from Volunteers
  getRequestsReceived = taskID => {
    const { reliefCenterID } = this.props.match.params;

    this.props.history.push(
      `/dashboard/relief-center/id/${reliefCenterID}/task/${taskID}/received`
    );
  };

  // Get All Suggestions
  getAllSuggestions = taskID => {
    const { reliefCenterID } = this.props.match.params;

    this.props.history.push(
      `/dashboard/relief-center/id/${reliefCenterID}/task/${taskID}/suggestions`
    );
  };

  componentDidMount() {
    const { reliefCenterID } = this.props.match.params;

    // Get Info about the Relief Center into consideration
    this.getReliefCenterByID(reliefCenterID);

    // Get Suggestions!
    this.getSuggestions();
  }

  render() {
    // Styles
    const classes = styles;

    // Get Stuff from the state
    const { reliefCenter, suggestions, reliefCenterInfo } = this.state;
    return (
      <ThemeProvider theme={Theme}>
        {/* Back Arrow with Relief Center's Name */}
        <Typography variant="h5" align="left">
          <IconButton onClick={() => this.props.history.goBack()}>
            <ArrowBack />
          </IconButton>
          {`${reliefCenterInfo.name} > Volunteer Management` ||
            "Volunteer Management"}
        </Typography>

        {/* Table Starts */}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            {/* Table Header Starts */}
            <TableHead>
              <TableRow>
                <TableCell align="center">Job</TableCell>
                <TableCell align="center">Short By</TableCell>
                <TableCell align="center">Assigned</TableCell>
                <TableCell align="center">Requests Sent</TableCell>
                <TableCell align="center">Requests Received</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">End Time</TableCell>
                <TableCell align="center">Suggestions</TableCell>
              </TableRow>
            </TableHead>
            {/* Table Header Ends */}

            {/* Table Body Starts */}
            <TableBody>
              {reliefCenter.map((job, index) => {
                // const { name } = this.state.suggestions;
                return (
                  <TableRow key={index}>
                    <TableCell align="center" component="th" scope="row">
                      {job.type}
                    </TableCell>
                    <TableCell align="center">
                      {job.total_capacity - job.assigned_total}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          this.getAssigned(job.task_id);
                        }}
                      >
                        {job.assigned_total}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          this.getPendingRequests(job.task_id);
                        }}
                      >
                        {job.requests_sent_by_admin_total}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          this.getRequestsReceived(job.task_id);
                        }}
                      >
                        {job.volunteer_requests_total}
                      </Button>
                    </TableCell>

                    <TableCell align="center">
                      {job.date ? new Date(job.date).toDateString() : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {job.start_time ? job.start_time : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {job.end_time ? job.end_time : "N/A"}
                    </TableCell>
                    {/* User Suggestion Column */}
                    <TableCell align="center">
                      {/* Suggest a Random User! */}
                      {suggestions.length > 0 && (
                        <>
                          <Suggestion
                            user={
                              // Suggest Voluteers which are: not assigned, not requested, not requesting
                              this.suggestUser(
                                job.task_id,
                                job.assigned,
                                job.requests_sent_by_admin,
                                job.volunteer_requests
                              )
                            }
                            taskID={job.task_id}
                            onSendRequestClick={this.sendRequestToVolunteer}
                          />
                          <Button
                            onClick={() => this.getAllSuggestions(job.task_id)}
                          >
                            See All
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {/* Table Body Ends */}
          </Table>
        </TableContainer>

        {/* Table Ends */}
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(withRouter(AssignVolunteers));
