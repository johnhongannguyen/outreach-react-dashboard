import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    // width: 350,
    height: 175,
    padding: 10
    // height: 300
  },
  media: {
    // height: 140
  },
  declineButton: {
    padding: 0
  }
});

export default function VolunteerRequestCard({
  content,
  title,
  contentExtra,
  onAccept,
  onDecline
}) {
  const classes = useStyles();

  return (
    <Card elevation={3} className={classes.root}>
      <CardContent>
        <Typography
          noWrap
          align="left"
          gutterBottom
          variant="h6"
          component="h6"
        >
          {title}
        </Typography>
        <Typography
          align="left"
          variant="body2"
          // color="textSecondary"
          component="p"
          noWrap
        >
          {content}
        </Typography>
        <Typography
          align="left"
          variant="body2"
          // color="textSecondary"
          component="p"
          noWrap
        >
          {contentExtra}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justify="space-between">
          <Tooltip title="😱" aria-label="decline">
            <Button
              size="small"
              color="danger"
              onClick={onDecline}
              className={classes.declineButton}
            >
              Decline
            </Button>
          </Tooltip>

          <Tooltip title="🤩" aria-label="assign">
            <Button color="primary" variant="outlined" onClick={onAccept}>
              Accept
            </Button>
          </Tooltip>
        </Grid>
      </CardActions>
    </Card>
  );
}
