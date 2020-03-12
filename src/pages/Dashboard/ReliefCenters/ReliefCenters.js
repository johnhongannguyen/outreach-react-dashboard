import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

// Axios
import axios from "axios";
import { Paper, Grid, Typography, Button, Badge } from "@material-ui/core";
import VolunteerRequestCard from "../../../components/Dashboard/VolunteerRequestCard";
import ReliefCenterActionCard from "../../../components/Dashboard/ReliefCenterActionCard";

// React Router
import { Link } from "react-router-dom";

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
      notifications: []
    };
  }

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    const { notifications } = this.state;
    return (
      <>
        <Typography align="left" variant="h5" component="h3">
          Relief Centers - Action Needed
        </Typography>
        <Paper className={classes.paper}>
          <Grid justify="center" container>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              .filter(index => index < 2)
              .map(value => (
                <Grid item className={classes.hoverStyle}>
                  <ReliefCenterActionCard
                    name="Relief Center Name"
                    list={<div>list</div>}
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

export default withStyles(styles)(ReliefCenters);
