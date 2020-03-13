import React, { Component } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import "date-fns";
// import Grid from "@material-ui/core/Grid";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker
// } from "@material-ui/pickers";

// Styles
const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5"
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)"
    }
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""'
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3"
    }
  }
});
// const [selectedDate, setSelectedDate] = React.useState(
//   new Date("2014-08-18T21:11:54")
// );
export default class ReliefCenterForms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameOfCenter: "Flood",
      nameOfJob: "Driving"
    };
  }
  handleChange = () => {
    console.log("Something was changed");
  };

  handleClick(event) {
    console.log(event.target);
  }
  // handleDateChange = date => {
  //   setSelectedDate(date);
  // };

  // selectedDate = ()=>{

  // }

  StyledRadio = props => {
    const classes = useStyles();
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  };

  render() {
    const { nameOfCenter } = this.props;
    const { nameOfJob } = this.props;
    return (
      <>
        <FormControl>
          <InputLabel id="reliefCenterName">Relief Center Name Here</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={nameOfCenter}
            onChange={this.handleChange}
          >
            <MenuItem value={"Tsnuami"}> Tsunami </MenuItem>
            <MenuItem value={"Flood"}> Flood </MenuItem>
            <MenuItem value={"Food"}> Food </MenuItem>
            <MenuItem value={"Other"}> Other </MenuItem>
          </Select>
        </FormControl>
        <Card>
          <FormControl id="volunteerTab">
            <InputLabel id="volunteerDetail">Volunteer Details</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={nameOfJob}
              onChange={this.handleChange}
            >
              <MenuItem value={"Driving"}> Driving </MenuItem>
              <MenuItem value={"Baby Sitting"}> Baby Sitting </MenuItem>
              <MenuItem value={"Cooking"}> Cooking </MenuItem>
              <MenuItem value={"Other"}> Other </MenuItem>
            </Select>
            <FormControl id="availability" component="fieldset">
              <FormLabel component="legend"></FormLabel>
              <RadioGroup
                defaultValue="anyTime"
                aria-label="preference"
                name="customized-radios"
              >
                <FormControlLabel
                  value="anyTime"
                  control={<this.StyledRadio />}
                  label="Any Time"
                />
                <FormControlLabel
                  id="showDate"
                  onClick={this.handleClick}
                  value="preference"
                  control={<this.StyledRadio />}
                  label="Choose your preference"
                />
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date picker inline"
                      value={this.selectedDate}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider> */}
              </RadioGroup>
            </FormControl>
          </FormControl>
        </Card>
      </>
    );
  }
}
