import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 100
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

export default function Suggestion({ user, onSendRequestClick, taskID }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="body1" component="h4">
          {user.name}
        </Typography>
        <Typography variant="body2" component="h4">
          {user.email}
        </Typography>
      </CardContent>
      <CardActions className={classes.action}>
        {user.name !== "No Suggestions" && (
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            size="medium"
            onClick={() => onSendRequestClick(user.email, taskID)}
          >
            Request
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
