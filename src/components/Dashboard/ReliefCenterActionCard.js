import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function ReliefCenterActionCard({ list, name, onAssignClick }) {
  const [value, setValue] = useState(1);
  const classes = useStyles();

  //   Handle Radio Change
  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <List>
            {list.map(listItem => (
              <ListItem>
                <ListItemText>{listItem.type}</ListItemText>
                <ListItemText>{listItem.total}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justify="flex-end">
          <Button color="primary" variant="outlined" onClick={onAssignClick}>
            Assign
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
