import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  ThemeProvider,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

// Custom Components and Themes
import ReliefCenterActionCard from "../../../components/Dashboard/ReliefCenterActionCard";
import Theme from "../../../theme";

// Redux Connect function
import { connect } from "react-redux";
import { apiCall } from "../../../api";

// ENV
const API_URL = process.env.REACT_APP_API_URL;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  // homeGrid: { backgroundColor: "#111C24" },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // backgroundColor: "#111C24"
  },
  volunteerRequests: {
    // backgroundColor: "white"
  },
  root: { backgroundColor: "#fff", border: "#fff" },
  hoverStyle: {
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    marginTop: "1rem",
    marginRight: "1rem",
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
    },
  },
});

class ReliefCenters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      reliefCenters: [],
      reliefCenterSearchValue: "",
    };
  }

  // Function to check if its the homepage
  isHomePage = () => this.props.location.pathname === "/dashboard/";

  // API Call
  getDataFromAPI = async (relativePath, token) => {
    apiCall(token, relativePath, "GET")
      .then((response) => {
        this.setState({
          reliefCenters: response.data,
        });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  assignVolunteers = (reliefCenterID) => {
    this.props.history.push(
      `/dashboard/relief-center/id/${reliefCenterID}/assign`
    );
  };

  handleButtonPress(type) {
    // Get Relief Centers from the state
    const { reliefCenters } = this.state;

    // Oldest First Function
    const byOldestFirst = (a, b) => {
      const aTimeStampedAt = a.updatedAt || a.createdAt;
      const bTimeStampedAt = b.updatedAt || b.createdAt;

      if (aTimeStampedAt > bTimeStampedAt) {
        return 1;
      }
      if (bTimeStampedAt > aTimeStampedAt) {
        return -1;
      }
      return 0;
    };

    // Recent First Function
    const byRecentFirst = (a, b) => {
      const aTimeStampedAt = a.updatedAt || a.createdAt;
      const bTimeStampedAt = b.updatedAt || b.createdAt;

      if (aTimeStampedAt > bTimeStampedAt) {
        return -1;
      }
      if (bTimeStampedAt > aTimeStampedAt) {
        return 1;
      }
      return 0;
    };

    switch (type) {
      case "All":
        // code block
        break;
      case "Oldest":
        // code block
        reliefCenters.sort(byOldestFirst);
        this.setState({ reliefCenters });
        break;
      case "Recent":
        // code block
        reliefCenters.sort(byRecentFirst);
        this.setState({ reliefCenters });
        break;
      default:
      // code block
    }
  }

  componentDidMount() {
    const { token } = this.props.auth;

    this.getDataFromAPI("/relief-center/all/requirement", token);
  }

  render() {
    const { classes, auth } = this.props;
    const { notifications, reliefCenters } = this.state;
    return (
      <ThemeProvider theme={Theme}>
        {/* Title */}
        {this.isHomePage() ? (
          <Typography align="left" variant="h6" component="h3">
            Relief Centers{" "}
            <Typography variant="body2" component="span">
              - Action Needed
            </Typography>
          </Typography>
        ) : (
          <Typography align="left" variant="h6" component="h3">
            Assign volunteers to relief centres
          </Typography>
        )}

        {/* Internal Page: Search, Sort, and Request Form Button */}
        {!this.isHomePage() && (
          <Grid justify="flex-start" container xs="12">
            {/* Search Input */}

            <Grid item xs="6">
              <TextField
                size="small"
                className={classes.searchReliefCenter}
                margin="dense"
                fullWidth
                onChange={(event) =>
                  this.setState({ reliefCenterSearchValue: event.target.value })
                }
                id="outlined-search"
                placeholder="Search Relief Center"
                type="search"
                variant="outlined"
                InputProps={{
                  fontFamily: "Open Sans",
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Sorting Button Group */}
            <Grid spacing={2} item xs="4">
              <Button
                onClick={() => this.handleButtonPress("All")}
                variant="outlined"
                color="primary"
              >
                All
              </Button>
              <Button
                onClick={() => this.handleButtonPress("Oldest")}
                variant="outlined"
                color="primary"
              >
                Oldest
              </Button>
              <Button
                onClick={() => this.handleButtonPress("Recent")}
                variant="outlined"
                color="primary"
              >
                Recent
              </Button>
            </Grid>

            {/* Request Form Button */}
            <Grid item xs="2">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  this.props.history.push("/dashboard/relief-center-forms");
                }}
              >
                Request Form
              </Button>
            </Grid>
          </Grid>
        )}

        {/* Relief Center Container */}
        <Paper square={false} className={classes.paper}>
          <Grid container spacing={2} justify="space-evenly">
            {reliefCenters.length > 0 &&
              reliefCenters
                .filter((reliefCenter) =>
                  reliefCenter.name
                    .toLowerCase()
                    .includes(this.state.reliefCenterSearchValue.toLowerCase())
                )
                .map((reliefCenter) => (
                  // Conditional Column Sizing!
                  <Grid xs={12} md={6} lg={this.isHomePage() ? 6 : 4} item>
                    <ReliefCenterActionCard
                      className={classes.hoverStyle}
                      name={reliefCenter.name}
                      list={reliefCenter.required}
                      onAssignClick={() =>
                        this.assignVolunteers(reliefCenter._id)
                      }
                    />
                  </Grid>
                ))}
          </Grid>

          {/* See All Button (On Home Page) */}
          {this.isHomePage() && (
            <Grid container justify="flex-end">
              <Link to="/dashboard/relief-centers">
                <Button>See all..</Button>
              </Link>
            </Grid>
          )}
        </Paper>
      </ThemeProvider>
    );
  }
}

// Redux - Map State to Sign In Page props
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(withRouter(ReliefCenters)));
