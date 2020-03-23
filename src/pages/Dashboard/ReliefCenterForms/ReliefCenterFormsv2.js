import React, { Component } from "react";
import Axios from "axios";
import _ from "moment";
// Material UI
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Card,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// Icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// Labs
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";

// Custom Components
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

      tasks: [
        {
          taskID: 1,
          numberOfPeople: 10,
          typeOfJob: "Cooking",
          preference: "anytime"
        },
        {
          taskID: 2,
          numberOfPeople: 5,
          typeOfJob: "Driving",
          preference: "preference",
          date: new Date(),
          start_time: new Date(),
          end_time: new Date()
        }
      ]
    };
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

  // Handle Number of People Change
  handleNumberOfPeopleChange = (e, taskID) => {
    // Get the Number of people
    const numberOfPeople = e.target.value;
    // Find the object.. in tasks.. and update the concerned value.
    const { tasks } = this.state;
    const foundIndex = tasks.findIndex(task => task.taskID == taskID);

    tasks[foundIndex]["numberOfPeople"] = numberOfPeople;
  };

  // Handle Preference Change
  handlePreferenceChange = (e, taskID) => {
    // Get the Preference
    const preference = e.target.value;

    // Find the object.. in tasks.. and update the concerned value.
    const { tasks } = this.state;
    const foundIndex = tasks.findIndex(task => task.taskID == taskID);

    tasks[foundIndex]["preference"] = preference;
    this.setState({ tasks });
  };

  // Handle Type of Job Change
  handleTypeOfJobChange = (e, taskID) => {
    // Get the Preference
    const typeOfJob = e.target.value;

    // Find the object.. in tasks.. and update the concerned value.
    const { tasks } = this.state;
    const foundIndex = tasks.findIndex(task => task.taskID == taskID);

    tasks[foundIndex]["typeOfJob"] = typeOfJob;
    this.setState({ tasks });
  };

  // Add Form Button Handler
  addForm = () => {
    const { tasks } = this.state;
    tasks.push({
      // Problematic if someone decides to delete one of the items!
      taskID: tasks.length + 1,
      numberOfPeople: 2,
      nameOfJob: "Cooking",
      typeOfJob: "Cooking",
      preference: "anytime"
    });

    this.setState({ tasks });
  };

  // Handle Date and Time change for Preference
  handleDateTimeChange = (momentObject, taskID, ID) => {
    // Get the Preference
    const date = momentObject._d;

    // Find the object.. in tasks.. and update the concerned value.
    const { tasks } = this.state;
    const foundIndex = tasks.findIndex(task => task.taskID == taskID);

    tasks[foundIndex][ID] = date;
    this.setState({ tasks });
  };

  // Task Card Component
  TaskCard = ({
    taskID,
    numberOfPeople,
    typeOfJob,
    preference,
    date,
    start_time,
    end_time,
    onNumberOfPeopleChange,
    onPreferenceChange,
    onTypeOfJobChange
  }) => (
    <Card taskID={taskID} style={{ padding: 50, marginBottom: 25 }}>
      {numberOfPeople > 0 && typeOfJob && (
        <Typography align="left" variant="h4">
          Requesting {numberOfPeople} volunteers for {typeOfJob}
        </Typography>
      )}

      <Grid container justify="center" spacing={2}>
        <Grid xs={4} item>
          <InputLabel id="volunteerDetail">Type of Job</InputLabel>

          {/* Type of Task (Job)! */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeOfJob}
            fullWidth
            onChange={e => onTypeOfJobChange(e, taskID)}
          >
            <MenuItem value={"Driving"}>Driving</MenuItem>
            <MenuItem value={"Baby Sitting"}>Baby Sitting</MenuItem>
            <MenuItem value={"Cooking"}>Cooking</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </Grid>

        <Grid xs={3} item>
          {/* Number of people needed */}
          <TextField
            defaultValue={numberOfPeople || 1}
            onChange={e => onNumberOfPeopleChange(e, taskID)}
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

      {/* Preference */}
      <RadioGroup
        aria-label="preference"
        name="preference"
        value={preference}
        onChange={e => onPreferenceChange(e, taskID)}
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

      {preference == "preference" && (
        <DateTimePicker
          taskID={taskID}
          selectedDate={date}
          selectedStartTime={start_time}
          selectedEndTime={end_time}
          onDateChange={e => this.handleDateTimeChange(e, taskID, "date")}
          onStartTimeChange={e =>
            this.handleDateTimeChange(e, taskID, "start_time")
          }
          onEndTimeChange={e =>
            this.handleDateTimeChange(e, taskID, "end_time")
          }
        />
      )}
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
        {/* Panel Title - Relief Center Form */}
        <Typography align="left" variant="h3">
          {reliefCenterName == null || reliefCenterName == ""
            ? "Relief Center Form"
            : `${reliefCenterName.title} Form`}
        </Typography>

        {/* Relief Center Name Input */}
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

        {/* Task Cards */}
        {this.state.tasks.map((task, index) => {
          const {
            taskID,
            numberOfPeople,
            nameOfJob,
            typeOfJob,
            date,
            start_time,
            end_time,
            preference
          } = task;
          return (
            <this.TaskCard
              key={index}
              taskID={taskID}
              numberOfPeople={numberOfPeople}
              nameOfJob={nameOfJob}
              typeOfJob={typeOfJob}
              preference={preference}
              date={date}
              start_time={start_time}
              end_time={end_time}
              onNumberOfPeopleChange={this.handleNumberOfPeopleChange}
              onPreferenceChange={this.handlePreferenceChange}
              onTypeOfJobChange={this.handleTypeOfJobChange}
            />
          );
        })}

        {/* Button to Add More Task Cards */}
        <Button onClick={this.addForm}>
          ADD <AddCircleOutlineIcon />
        </Button>

        {/* Submit Button */}
        <Button variant="contained">Submit</Button>
      </>
    );
  }
}
