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
  Tooltip,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";

// Custom Components and Themes
import Suggestion from "../../../components/Dashboard/Suggestion";
import Theme from "../../../theme";

// Moment!
import moment from "moment";

// Web Sockets - Socket.io
import { clientSocket, adminSocket } from "../../../web-sockets";

// Redux Connect
import { connect } from "react-redux";
import { apiCall } from "../../../api";

// API URL
// const API_URL = process.env.REACT_APP_API_URL;

const styles = (theme) => ({
  table: {
    minWidth: 650,
    // maxWidth: 200
  },
  container: {},
  suggestion: {
    // maxWidth: 20,
    // padding: 10,
    // margin: 10
  },
});

// Custom Table Cell
const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#eee",
    color: "#F27821",
    fontSize: "14px !important",
    fontWeight: "bold",
    fontFamily: "Quicksand !important",
  },
  body: {
    fontSize: 18,
    fontWeight: "bold",
    opacity: 0.13,

    // color: "#F27821"
  },
}))(TableCell);

class AssignVolunteers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reliefCenter: [],
      suggestions: [],
      reliefCenterInfo: {},
    };
  }

  // Get Relief Center by ID
  getReliefCenterByID = (reliefCenterID) => {
    apiCall(
      this.props.auth.token,
      `/relief-center/id/${reliefCenterID}/requirement/assign`,
      "GET"
    ).then((response) => {
      this.setState({ reliefCenter: response.data });
    });

    apiCall(
      this.props.auth.token,
      `/relief-center/id/${reliefCenterID}`,
      "GET"
    ).then((response) => {
      this.setState({ reliefCenterInfo: response.data });
    });
  };

  // Get Suggestions
  getSuggestions = async (number) => {
    const suggestions = await apiCall(
      this.props.auth.token,
      `/user/suggest/`,
      "GET"
    );
    this.setState({ suggestions: suggestions.data });
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

          this.getReliefCenterByID(reliefCenterID);
        }
      })
      .catch((err) => console.log(err));
  };

  // Suggest ONE user from suggestions
  suggestUser(taskID, assigned, requestsSentByAdmin, volunteerRequests) {
    let { suggestions } = this.state;

    // Filter Suggestions (We don't need users that are/have assigned, requests, requested etc.)
    const filteredSuggestions = suggestions.filter((suggestion) => {
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
  getAssigned = (taskID) => {
    const { reliefCenterID } = this.props.match.params;
    this.props.history.push(
      `/dashboard/relief-center/id/${reliefCenterID}/task/${taskID}/assigned`
    );
  };

  // Get Pending Requests to be accepted by Volunteers
  getPendingRequests = (taskID) => {
    const { reliefCenterID } = this.props.match.params;

    this.props.history.push(
      `/dashboard/relief-center/id/${reliefCenterID}/task/${taskID}/pending`
    );
  };

  // Get Requests Received from Volunteers
  getRequestsReceived = (taskID) => {
    const { reliefCenterID } = this.props.match.params;

    this.props.history.push(
      `/dashboard/relief-center/id/${reliefCenterID}/task/${taskID}/received`
    );
  };

  // Get All Suggestions
  getAllSuggestions = (taskID) => {
    const { reliefCenterID } = this.props.match.params;

    this.props.history.push(
      `/dashboard/relief-center/id/${reliefCenterID}/task/${taskID}/suggestions`
    );
  };

  componentDidMount() {
    const { reliefCenterID } = this.props.match.params;

    // Get Token from Redux
    const { token } = this.props.auth;

    // Set Token
    this.setState({ token });

    // Get Info about the Relief Center into consideration
    this.getReliefCenterByID(reliefCenterID);

    // Get Suggestions!
    this.getSuggestions();

    clientSocket.on("reliefCenterDataChange", () => {
      // Get Info about the Relief Center into consideration
      this.getReliefCenterByID(reliefCenterID);

      // Get Suggestions!
      this.getSuggestions();
    });
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
            <ArrowBackIos />
          </IconButton>
          {`${reliefCenterInfo.name}` || "Volunteer Management"}
        </Typography>

        {/* Table Starts */}
        <TableContainer className={classes.container} component={Paper}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label="relief center table"
          >
            {/* Table Header Starts */}
            <TableHead>
              <TableRow>
                <CustomTableCell align="center">Job</CustomTableCell>
                <CustomTableCell align="center">Short By</CustomTableCell>
                <CustomTableCell align="center">Assigned</CustomTableCell>
                <CustomTableCell align="center">Requests Sent</CustomTableCell>
                <CustomTableCell align="center">
                  Requests Received
                </CustomTableCell>
                <CustomTableCell align="center">Date</CustomTableCell>
                <CustomTableCell align="center">Start Time</CustomTableCell>
                <CustomTableCell align="center">End Time</CustomTableCell>
                <CustomTableCell align="center">Suggestions</CustomTableCell>
              </TableRow>
            </TableHead>
            {/* Table Header Ends */}

            {/* Table Body Starts */}
            <TableBody>
              {reliefCenter.map((job, index) => {
                // const { name } = this.state.suggestions;
                return (
                  <TableRow key={index}>
                    <TableCell align="center" scope="row">
                      {job.type}
                    </TableCell>
                    <TableCell align="center">
                      {job.total_capacity - job.assigned_total}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View all volunteers assigned">
                        <Button
                          onClick={() => {
                            this.getAssigned(job.task_id);
                          }}
                        >
                          {job.assigned_total}
                        </Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View all volunteers you've requested">
                        <Button
                          onClick={() => {
                            this.getPendingRequests(job.task_id);
                          }}
                        >
                          {job.requests_sent_by_admin_total}
                        </Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View all requests from volunteers">
                        <Button
                          onClick={() => {
                            this.getRequestsReceived(job.task_id);
                          }}
                        >
                          {job.volunteer_requests_total}
                        </Button>
                      </Tooltip>
                    </TableCell>

                    <TableCell align="center">
                      {job.date ? moment(job.date).format("MM-DD-YYYY") : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {job.start_time
                        ? moment(job.start_time).format("hh:MM A")
                        : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {job.end_time
                        ? moment(job.end_time).format("hh:MM A")
                        : "N/A"}
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

// Redux - Map (Redux) State -> props
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(withRouter(AssignVolunteers)));

// export default withStyles(styles)(withRouter(AssignVolunteers));
