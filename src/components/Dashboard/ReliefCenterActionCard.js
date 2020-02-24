import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function ReliefCenterActionCard({ list, name }) {
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
          <FormControl component="fieldset" className={classes.formControl}>
            {/* <FormLabel component="legend">Gender</FormLabel> */}
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Cooking"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Babysitting"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Driving"
              />
            </RadioGroup>
          </FormControl>
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justify="flex-end">
          <Button color="primary" variant="contained">
            Assign
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
