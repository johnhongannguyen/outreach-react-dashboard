import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

// Axios
import axios from "axios";
import { Paper, Grid, Typography, Button, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import NotificationCard from "../../../components/Dashboard/NotificationCard";
import Volunteers from "../Volunteers/Volunteers";
import ReliefCenters from "../ReliefCenters/ReliefCenters";

// Web Sockets - Socket.io
import { clientSocket, adminSocket } from "../../../web-sockets";

// ENV
const API_URL = process.env.REACT_APP_API_URL;

//     await fetchDataFromAPI("/relief-center");
const styles = theme => ({
  root: {
    flexGrow: 1,
    fontFamily: "Open Sans"
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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      updates: null
    };
  }

  // Handle Notify Click
  handleNotifyClick = broadcastMessage => {
    console.log("Trying to broadcast:", broadcastMessage);

    clientSocket.emit("broadcastMessage", broadcastMessage);
  };
  async componentDidMount() {
    // React Redux
    // this.props.getItems();

    // Socket.io
    clientSocket.connect();

    // DEBUG CONNECTITON
    console.log(clientSocket.connected);
    // console.log(adminSocket.connected);

    clientSocket.on("reliefCenterDataChange", () => {
      // Get the latest changes
      console.log("Data was changed..");
    });

    // News API
    const news = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=ca&category=health&apiKey=bfac22be31a14e678bc1e744de315c5d"
    );
    this.setState({ updates: news.data });
  }

  render() {
    const { classes } = this.props;
    const { updates } = this.state;
    // Redux
    // const { items } = this.props.item;
    return (
      <>
        <Grid container className={classes.root} spacing={2}>
          {/* Redux Test */}
          {/* <div>{JSON.stringify(items)}</div> */}

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
            <Typography variant="h5" align="left" component="h3">
              Updates
            </Typography>
            <Paper className={classes.paper}>
              <Grid justify="center" container>
                {updates ? (
                  updates &&
                  updates.articles.slice(0, 3).map(update => (
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

              <Grid container justify="flex-end">
                <Link to="/dashboard/volunteers">
                  <Button>See All..</Button>
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(Home);
