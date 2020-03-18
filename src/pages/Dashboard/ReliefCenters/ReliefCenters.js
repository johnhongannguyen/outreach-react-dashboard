import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

// Axios
import axios from "axios";
import {
  Paper,
  Grid,
  Typography,
  Button,
  ButtonGroup,
  Badge,
  TextField,
  InputAdornment
} from "@material-ui/core";

import { Search as SearchIcon } from "@material-ui/icons";
import ReliefCenterActionCard from "../../../components/Dashboard/ReliefCenterActionCard";

// React Router
import { Link, withRouter, Redirect } from "react-router-dom";
import AssignVolunteers from "./AssignVolunteers";

// ENV
const API_URL = process.env.REACT_APP_API_URL;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  // homeGrid: { backgroundColor: "#111C24" },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
    // backgroundColor: "#111C24"
  },
  volunteerRequests: {
    // backgroundColor: "white"
  },
  hoverStyle: {
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    marginTop: "1rem",
    marginRight: "1rem",
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
    }
  }
});

class ReliefCenters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      reliefCenters: [],
      reliefCenterSearchValue: ""
    };
  }

  // Function to check if its the homepage
  isHomePage = () => this.props.location.pathname === "/dashboard/home";

  // API Call
  getDataFromAPI = async relativePath => {
    await axios
      .get(`${API_URL}${relativePath}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          reliefCenters: response.data
        });
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  };

  assignVolunteers = reliefCenterID => {
    console.log(reliefCenterID);
    this.props.history.push(
      `/dashboard/relief-center/id/${reliefCenterID}/assign`
    );
  };

  handleButtonPress(type) {
    switch (type) {
      case "All":
        // code block
        break;
      case "Oldest":
        // code block
        break;
      case "Recent":
        // code block
        break;
      default:
      // code block
    }
  }

  componentDidMount() {
    this.getDataFromAPI("/relief-center/all/requirement");
  }

  render() {
    const { classes } = this.props;

    const { notifications, reliefCenters } = this.state;
    return (
      <>
        <Typography align="left" variant="h5" component="h3">
          Relief Centers - Action Needed
        </Typography>
        {!this.isHomePage() && (
          <Grid xs="8">
            <Grid item xs="4">
              <TextField
                onChange={event =>
                  this.setState({ reliefCenterSearchValue: event.target.value })
                }
                id="outlined-search"
                label="Search Relief Center"
                type="search"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />

              <ButtonGroup
                size="large"
                color="primary"
                aria-label="large outlined primary button group"
              >
                <Button onClick={() => this.handleButtonPress("All")}>
                  All
                </Button>
                <Button>Oldest</Button>
                <Button>Recent</Button>
              </ButtonGroup>
            </Grid>

            <Grid item xs="4"></Grid>
          </Grid>
        )}

        <Paper className={classes.paper}>
          <Grid justify="center" container>
            {reliefCenters
              .filter(reliefCenter =>
                reliefCenter.name
                  .toLowerCase()
                  .includes(this.state.reliefCenterSearchValue.toLowerCase())
              )
              .map(reliefCenter => (
                <Grid item className={classes.hoverStyle}>
                  <ReliefCenterActionCard
                    name={reliefCenter.name}
                    list={reliefCenter.required}
                    onAssignClick={() =>
                      this.assignVolunteers(reliefCenter._id)
                    }
                  />
                </Grid>
              ))}
          </Grid>

          <Grid container justify="flex-end">
            <Link to="/dashboard/relief-centers">
              <Button>See All..</Button>
            </Link>
          </Grid>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(ReliefCenters));
