import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

// Axios
import axios from "axios";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import NotificationCard from "../../../components/Dashboard/NotificationCard";
import Volunteers from "../Volunteers/Volunteers";
import ReliefCenters from "../ReliefCenters/ReliefCenters";

// Web Sockets - Socket.io
import { clientSocket, adminSocket } from "../../../web-sockets";
// Redux Connect
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Open Sans",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  volunteerRequests: {},
  hoverStyle: {
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    marginBottom: "1rem",
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
    },
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updates: null,
      updatesLoading: false,
    };
  }

  // Handle Notify Click
  handleNotifyClick = (broadcastMessage) => {
    clientSocket.emit("broadcastMessage", broadcastMessage);
  };

  async componentDidMount() {
    // Get Token from Redux
    const { token } = this.props.auth;

    // Socket.io
    clientSocket.connect();

    clientSocket.on("reliefCenterDataChange", () => {
      // Get the latest changes
    });

    // News API

    this.setState({ updatesLoading: true });
    const news = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=ca&category=health&apiKey=bfac22be31a14e678bc1e744de315c5d"
    );

    this.setState({ updates: news.data, updatesLoading: false });
  }

  render() {
    const { classes } = this.props;
    const { updates, updatesLoading } = this.state;
    return (
      <>
        <Grid container className={classes.root} spacing={2}>
          {/* Volunteer Requests */}
          <Grid item xs={12} className={classes.homeGrid}>
            <Volunteers />
          </Grid>

          {/* Relief Centers - Action Needed */}
          <Grid item xs={12} lg={6}>
            <ReliefCenters />
          </Grid>

          {/* Notifications (Alerts) */}
          <Grid item xs={12} lg={6}>
            <Typography
              variant="h4"
              align="center"
              component="h3"
              style={{ marginBottom: "0.5rem", marginTop: "1rem" }}>
              Updates
            </Typography>
            {/* <Paper className={classes.paper}> */}

            {updatesLoading ? (
              <Grid justify="center" container>
                <CircularProgress color="primary" />
              </Grid>
            ) : (
              <Grid justify="center" container>
                {updates ? (
                  updates &&
                  updates.articles.slice(0, 3).map((update) => (
                    <Grid item className={classes.hoverStyle}>
                      <NotificationCard
                        content={update.title}
                        onNotifyClick={() =>
                          this.handleNotifyClick(update.title)
                        }
                      />
                    </Grid>
                  ))
                ) : (
                  <Grid item>No New Notifications</Grid>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </>
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
)(withStyles(styles)(withRouter(Home)));
