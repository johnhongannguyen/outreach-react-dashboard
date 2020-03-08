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
    width: "100%"
  },
  media: {
    height: 140
  }
});

export default function NotificationCard({ content }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justify="flex-end">
          <Button color="primary" variant="contained">
            Notify
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
