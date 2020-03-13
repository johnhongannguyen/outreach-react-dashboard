import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

// Axios
import axios from "axios";
import { Paper, Grid, Typography, Button, Badge } from "@material-ui/core";
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
      reliefCenters: []
    };
  }

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

    // return <Redirect to="/dashboard/relief-centers/assign" />;
  };

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
        <Paper className={classes.paper}>
          <Grid justify="center" container>
            {reliefCenters.map(reliefCenter => (
              <Grid item className={classes.hoverStyle}>
                <ReliefCenterActionCard
                  name={reliefCenter.name}
                  list={reliefCenter.required}
                  onAssignClick={() => this.assignVolunteers(reliefCenter._id)}
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
