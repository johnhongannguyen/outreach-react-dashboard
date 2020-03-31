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
  ListItemText,
  Tooltip
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    // width: 250,
    // height: 250
    height: 250,
    padding: 10
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
        <Typography noWrap gutterBottom variant="h6" component="h2">
          {name}
        </Typography>
        {/* <Typography variant="body1" component="p"> */}
        <List>
          {list.map((listItem, listItemIndex) => {
            if (listItemIndex < 3)
              return (
                <ListItem alignItems="flex-start" dense>
                  <Grid container spacing={1} justify="space-between">
                    <Grid item>
                      <ListItemText>• {listItem.type}</ListItemText>
                    </Grid>
                    <Grid item>
                      <ListItemText>{listItem.total_capacity}</ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              );
          })}
        </List>
        {/* </Typography> */}
      </CardContent>
      <CardActions>
        <Grid container justify="center">
          <Tooltip title="🤩" aria-label="assign">
            <Button
              // fullWidth
              color="primary"
              variant="outlined"
              onClick={onAssignClick}
            >
              Assign
            </Button>
          </Tooltip>
        </Grid>
      </CardActions>
    </Card>
  );
}
