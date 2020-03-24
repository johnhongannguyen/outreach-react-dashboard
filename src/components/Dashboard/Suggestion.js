import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 150
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 12
  },
  pos: {
    marginBottom: 12
  },
  action: {
    display: "flex",
    justifyContent: "space-around"
  }
});

// Send Request to Volunteer
const sendRequestToVolunteer = volunteerID => {
  Axios.post();
};

export default function Suggestion({ user }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="body1" component="h4">
          {user.name}
        </Typography>
      </CardContent>
      <CardActions className={classes.action}>
        <Button
          color="primary"
          variant="outlined"
          size="medium"
          onClick={() => sendRequestToVolunteer(user._id)}
        >
          Send Request
        </Button>
      </CardActions>
    </Card>
  );
}
