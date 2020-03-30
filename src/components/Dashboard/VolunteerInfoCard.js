import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function VolunteerInfoCard({
  content,
  title,
  contentExtra,
  buttonText,
  onButtonClick
}) {
  const classes = useStyles();

  return (
    <Card elevation={5} className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {contentExtra}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justify="space-around">
          <Button color="primary" variant="outlined" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
