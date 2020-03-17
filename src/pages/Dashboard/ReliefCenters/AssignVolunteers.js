import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { withRouter } from "react-router-dom";
import Axios from "axios";
import { Typography, IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

// API URL
const API_URL = process.env.REACT_APP_API_URL;

const styles = theme => ({
  table: {
    minWidth: 650
  }
});

function createData(job, total, assignedVolunteers, pendingRequests, need) {
  return { job, total, assignedVolunteers, pendingRequests, need };
}

class AssignVolunteers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reliefCenter: { required: [] }
    };
  }

  componentDidMount() {
    const { reliefCenterID } = this.props.match.params;

    this.getReliefCenterByID(reliefCenterID);
  }

  // Get Relief Center by ID
  getReliefCenterByID = reliefCenterID => {
    Axios.get(
      `${API_URL}/relief-center/id/${reliefCenterID}/requirement`
    ).then(response => this.setState({ reliefCenter: response.data }));
  };

  render() {
    const classes = styles;
    const { reliefCenter } = this.state;
    return (
      <>
        <Typography variant="h5" align="left">
          <IconButton onClick={() => this.props.history.goBack()}>
            <ArrowBack />
          </IconButton>
          {reliefCenter.name}
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Job</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Assigned Volunteers</TableCell>
                <TableCell align="right">Pending Requests</TableCell>
                <TableCell align="right">Need</TableCell>
                <TableCell align="right">Suggestions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reliefCenter.required.map((job, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {job.type}
                  </TableCell>
                  <TableCell align="right">{job.total}</TableCell>
                  {/* <TableCell align="right">{job.assignedVolunteers}</TableCell>
                  <TableCell align="right">{job.pendingRequests}</TableCell>
                  <TableCell align="right">{job.need}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(AssignVolunteers));
