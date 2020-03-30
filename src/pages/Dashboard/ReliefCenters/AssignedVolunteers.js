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

class AssignedVolunteers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reliefCenter: [],
      suggestions: [],
      reliefCenterInfo: {}
    };
  }

  componentDidMount() {
    const { reliefCenterID } = this.props.match.params;
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
          {reliefCenterInfo.name || "Assigned Volunteers"}
        </Typography>

        {/* Table Starts */}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            {/* Table Header Starts */}
            <TableHead>
              <TableRow>
                <TableCell align="center">Job</TableCell>
                <TableCell align="center">Capacity</TableCell>
                <TableCell align="center">Assigned</TableCell>
                <TableCell align="center">Requests Sent</TableCell>
                <TableCell align="center">Need</TableCell>
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
                    <TableCell align="center">{job.total_capacity}</TableCell>
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
                      <Button>{job.total_capacity - job.assigned_total}</Button>
                    </TableCell>

                    <TableCell align="center">
                      <Button> {job.date ? job.date : "N/A"}</Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button>
                        {" "}
                        {job.start_time ? job.start_time : "N/A"}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button> {job.end_time ? job.end_time : "N/A"}</Button>
                    </TableCell>
                    {/* User Suggestion Column */}
                    <TableCell align="center">
                      {/* Suggest a Random User! */}
                      {suggestions.length > 0 && (
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

export default withStyles(styles)(withRouter(AssignedVolunteers));
