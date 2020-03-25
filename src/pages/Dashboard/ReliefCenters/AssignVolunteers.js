import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

// Material UI
import {
  Typography,
  Button,
  IconButton,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";

// Custom Components and Themes
import Suggestion from "../../../components/Dashboard/Suggestion";
import Theme from "../../../theme";

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
      reliefCenter: { required: [] },
      suggestions: []
    };
  }

  componentDidMount() {
    const { reliefCenterID } = this.props.match.params;

    // Get Info about the Relief Center into consideration
    this.getReliefCenterByID(reliefCenterID);

    // Get Suggestions!
    this.getSuggestions();
  }

  // Get Relief Center by ID
  getReliefCenterByID = reliefCenterID => {
    Axios.get(
      `${API_URL}/relief-center/id/${reliefCenterID}/requirement`
    ).then(response => this.setState({ reliefCenter: response.data }));
  };

  // Get Suggestions
  getSuggestions = async number => {
    const suggestions = await Axios.get(
      `${API_URL}/user/suggest/${number || 10}`
    );
    this.setState({ suggestions: suggestions.data });
  };

  render() {
    // Styles
    const classes = styles;

    // Get Stuff from the state
    const { reliefCenter, suggestions } = this.state;
    return (
      <ThemeProvider theme={Theme}>
        {/* Back Arrow with Relief Center's Name */}
        <Typography variant="h5" align="left">
          <IconButton onClick={() => this.props.history.goBack()}>
            <ArrowBack />
          </IconButton>
          {reliefCenter.name}
        </Typography>

        {/* Table Starts */}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            {/* Table Header Starts */}
            <TableHead>
              <TableRow>
                <TableCell align="center">Job</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Assigned Volunteers</TableCell>
                <TableCell align="center">Pending Requests</TableCell>
                <TableCell align="center">Need</TableCell>
                <TableCell align="center">Suggestions</TableCell>
              </TableRow>
            </TableHead>
            {/* Table Header Ends */}

            {/* Table Body Starts */}
            <TableBody>
              {reliefCenter.required.map((job, index) => {
                const { name } = this.state.suggestions;
                return (
                  <TableRow key={index}>
                    <TableCell align="center" component="th" scope="row">
                      {job.type}
                    </TableCell>
                    <TableCell align="center">{job.total_capacity}</TableCell>
                    <TableCell align="center">{job.assigned}</TableCell>
                    <TableCell align="center">
                      {job.volunteer_requests}
                    </TableCell>
                    <TableCell align="center">
                      {job.total_capacity - job.assigned}
                    </TableCell>
                    {/* User Suggestion Column */}
                    <TableCell align="center">
                      {/* Suggest a Random User! */}
                      {suggestions.length > 0 && (
                        <Suggestion
                          user={
                            suggestions[
                              Math.floor(
                                Math.random() * this.state.suggestions.length
                              )
                            ]
                          }
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

export default withStyles(styles)(withRouter(AssignVolunteers));
