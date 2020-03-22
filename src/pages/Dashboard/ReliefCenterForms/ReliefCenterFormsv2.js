import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import Axios from "axios";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import DateTimePicker from "../../../components/Dashboard/DateTimePicker";
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

export default class ReliefCenterForms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reliefCenterName: null,
      reliefCenters: [],
      preference: "anytime",
      nameOfJob: "cooking",
      tasks: [
        {
          key: 1,
          numberOfPeople: 2,
          nameOfJob: "cooking",
          typeOfJob: "",
          preference: "anytime"
        }
      ]
    };
  }

  // Handle Change?
  handleChange = e => {
    this.setState({ preference: e.target.value });
  };

  // Handle Click?
  handleClick(event) {
    console.log(event.target);
  }

  // Handle AutoComplete Change
  handleAutoCompleteChange = (event, newValue) => {
    if (newValue && newValue.inputValue) {
      this.setState({
        reliefCenterName: {
          title: newValue.inputValue
        }
      });

      return;
    }

    this.setState({
      reliefCenterName: newValue
    });
  };

  // Handle Filter Options
  handleFilterOptions = (options, params) => {
    let filter = createFilterOptions();

    const filtered = filter(options, params);

    if (params.inputValue !== "") {
      filtered.push({
        inputValue: params.inputValue,
        title: `Add "${params.inputValue}"`
      });
    }

    return filtered;
  };

  // Get Option Label
  getOptionLabel = option => {
    // e.g value selected with enter, right from the input
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.title;
  };

  // Custom Radio Component -- Don't Use it
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

  // Add Form Button Handler
  addForm = () => {
    const { tasks } = this.state;
    tasks.push({
      // Problematic if someone decides to delete one of the items!
      key: tasks.length + 1,
      numberOfPeople: 2,
      nameOfJob: "cooking",
      typeOfJob: "",
      preference: "anytime"
    });

    this.setState({ tasks });
  };

  // Task Card Component
  TaskCard = ({ key, numberOfPeople, nameOfJob, typeOfJob, preference }) => (
    <Card key={key} style={{ padding: 50 }}>
      {numberOfPeople > 0 && typeOfJob && (
        <Typography align="left" variant="body1">
          Requesting {numberOfPeople} volunteers for {typeOfJob}
        </Typography>
      )}

      <Grid container justify="flex-start">
        <Grid xs={4} item>
          <InputLabel id="volunteerDetail">Type of Job</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={nameOfJob}
            fullWidth
            onChange={this.handleChange}
          >
            <MenuItem value={"driving"}> Driving </MenuItem>
            <MenuItem value={"baby_sitting"}> Baby Sitting </MenuItem>
            <MenuItem value={"cooking"}> Cooking </MenuItem>
            <MenuItem value={"other"}> Other </MenuItem>
          </Select>
        </Grid>

        <Grid xs={2} item>
          <TextField
            defaultValue={numberOfPeople || 1}
            onChange={e => this.setState({ numberOfPeople: e.target.value })}
            type="number"
            fullWidth
            InputProps={{
              inputProps: {
                max: 10,
                min: 1
              }
            }}
            label="People Needed"
          ></TextField>
        </Grid>
      </Grid>

      {/* <FormLabel component="legend"></FormLabel> */}
      <RadioGroup
        aria-label="preference"
        name="preference"
        value={preference}
        onChange={this.handleChange}
      >
        <FormControlLabel
          value="anytime"
          control={<Radio />}
          label="Any time"
        />
        <FormControlLabel
          value="preference"
          control={<Radio />}
          label="Choose your preference"
        />
      </RadioGroup>

      {preference == "preference" && <DateTimePicker />}
    </Card>
  );
  // Lifecycle Methods
  async componentDidMount() {
    const reliefCenters = await Axios.get(
      `${process.env.REACT_APP_API_URL}/relief-center`
    );

    this.setState({
      reliefCenters: reliefCenters.data
    });
  }

  render() {
    const { reliefCenterName } = this.state;
    return (
      <>
        <Typography align="left" variant="h3">
          {reliefCenterName == null || reliefCenterName == ""
            ? "Relief Center Form"
            : `${reliefCenterName.title} Form`}
        </Typography>

        <Card style={{ padding: 25, marginBottom: 25 }}>
          <Autocomplete
            value={reliefCenterName}
            onChange={this.handleAutoCompleteChange}
            filterOptions={this.handleFilterOptions}
            id="relief-center-name"
            options={this.state.reliefCenters.map(reliefCenter => ({
              title: reliefCenter.name
            }))}
            freeSolo
            renderOption={option => option.title}
            getOptionLabel={this.getOptionLabel}
            renderInput={params => (
              <TextField
                {...params}
                placeholder="Main Street Relief Center"
                label="Relief Center Name"
                variant="outlined"
                block
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
              />
            )}
          />
        </Card>

        {this.state.tasks.map((task, index) => {
          const {
            key,
            numberOfPeople,
            nameOfJob,
            typeOfJob,
            preference
          } = task;
          return (
            <this.TaskCard
              key={key}
              numberOfPeople={numberOfPeople}
              nameOfJob={nameOfJob}
              typeOfJob={typeOfJob}
              preference={preference}
            />
          );
        })}

        <Button onClick={this.addForm}>
          ADD <AddCircleOutlineIcon />
        </Button>

        <Button variant="contained">Submit</Button>
      </>
    );
  }
}
