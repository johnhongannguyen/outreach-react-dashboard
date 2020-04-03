import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    width: "100%",
    // paddingLeft: 10,
    paddingRight: 10
  },
  media: {
    height: 140
  },
  notificationContent: {
    maxWidth: 300
  }
});

export default function NotificationCard({ content, onNotifyClick }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <CardContent>
            <Typography
              align="left"
              className={classes.notificationContent}
              variant="body2"
              color="textPrimary"
              component="p"
            >
              {content}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item>
          <CardActions>
            <Button color="primary" variant="outlined" onClick={onNotifyClick}>
              Notify
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}
