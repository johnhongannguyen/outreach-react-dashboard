import React, { Component } from "react";
import moment from "moment";

// React Router
import { withRouter } from "react-router-dom";

// Redux Connect
import { connect } from "react-redux";

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
  Typography,
} from "@material-ui/core";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";

// Icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// Labs
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

// Custom Components
import DateTimePicker from "../../../components/Dashboard/DateTimePicker";
import SubmittedTasksTableComponent from "./SubmittedTasksTableComponent";

// Thmee Provider
import Theme from "../../../theme";

// API Call
import { apiCall } from "../../../api";

// Styles
const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
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
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
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
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
  cardWrapper: {
    padding: 20,
  },
});

class ReliefCenterForms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reliefCenterName: null,
      reliefCenterID: null,
      reliefCenters: [],
      isSubmitTableVisible: false,
      isReliefCenterFormVisible: true,
      submitError: {
        isSet: false,
        message:
          "Sorry, you have to select a relief center first and add at least one task.",
      },
      tasks: [],
      volunteeringTypes: [],
    };
  }

  // Handle AutoComplete Change
  handleAutoCompleteChange = (event, newValue) => {
    if (newValue && newValue.inputValue) {
      this.setState({
        reliefCenterName: {
          title: newValue.inputValue,
        },
      });

      return;
    }

    this.setState({
      reliefCenterName: newValue,
    });
  };

  // Handle Filter Options
  handleFilterOptions = (options, params) => {
    let filter = createFilterOptions();

    const filtered = filter(options, params);

    if (params.inputValue !== "") {
      filtered.push({
        inputValue: params.inputValue,
        title: `Add "${params.inputValue}"`,
      });
    }

    return filtered;
  };

  // Get Option Label
  getOptionLabel = (option) => {
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
  StyledRadio = (props) => {
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
    const foundIndex = tasks.findIndex((task) => task.taskID == taskID);

    tasks[foundIndex]["numberOfPeople"] = numberOfPeople;
  };

  // Handle Preference Change
  handlePreferenceChange = (e, taskID) => {
    // Get the Preference
    const preference = e.target.value;

    // Find the object.. in tasks.. and update the concerned value.
    const { tasks } = this.state;
    const foundIndex = tasks.findIndex((task) => task.taskID == taskID);

    tasks[foundIndex]["preference"] = preference;

    // If Preferred -- Set Date, Start Time and End Time
    if (preference == "preference") {
      let start_time = new Date().setMinutes(0);
      let end_time = new Date();
      end_time.setHours(new Date().getHours() + 12);
      end_time.setMinutes(0);
      tasks[foundIndex]["date"] = new Date();
      tasks[foundIndex]["start_time"] = new Date(start_time);
      tasks[foundIndex]["end_time"] = end_time;
    } else if (preference == "anytime") {
      tasks[foundIndex]["date"] = undefined;
      tasks[foundIndex]["start_time"] = undefined;
      tasks[foundIndex]["end_time"] = undefined;
    }

    this.setState({ tasks });
  };

  // Handle Type of Job Change
  handleTypeOfJobChange = (e, taskID) => {
    // Get the Preference
    const typeOfJob = e.target.value;

    // Find the object.. in tasks.. and update the concerned value.
    const { tasks } = this.state;
    const foundIndex = tasks.findIndex((task) => task.taskID == taskID);

    tasks[foundIndex]["typeOfJob"] = typeOfJob;
    this.setState({ tasks });
  };

  // Add Form Button Handler
  addForm = () => {
    const { tasks } = this.state;
    tasks.push({
      // Problematic if someone decides to delete one of the items!
      taskID: tasks.length + 1,
      numberOfPeople: 1,
      typeOfJob: "Cooking",
      description: "The Description Goes Here",
      preference: "anytime",
    });

    this.setState({ tasks });
  };

  // Handle Date and Time change for Preference
  handleDateTimeChange = (momentObject, taskID, ID) => {
    // Get the Preference
    const date = momentObject && momentObject._d;

    // Find the object.. in tasks.. and update the concerned value.
    const { tasks } = this.state;
    const foundIndex = tasks.findIndex((task) => task.taskID == taskID);

    // Conditions
    const isStartTimeBeforeEndTime =
      ID == "start_time" &&
      ID !== "date" &&
      moment(date).isBefore(tasks[foundIndex]["end_time"]);

    const isEndTimeBeforeStartTime =
      ID !== "date" &&
      ID == "end_time" &&
      moment(date).isAfter(tasks[foundIndex]["start_time"]);

    // Valid start and end times
    if (isStartTimeBeforeEndTime || isEndTimeBeforeStartTime) {
      tasks[foundIndex][ID] = date;
    }
    if (ID == "date") tasks[foundIndex][ID] = date;
    this.setState({ tasks });
  };

  // Relief Center Form
  handleSubmitReliefCenterForm = async () => {
    // If Relief Center is selected and user has added one task..
    if (this.state.reliefCenterName && this.state.tasks.length > 0) {
      this.setState({
        submitError: { ...this.state.submitError, isSet: false },
      });
      // Map it before sending..
      let tasksToBeSentToDB = this.state.tasks.map((task) => {
        const {
          numberOfPeople,
          typeOfJob,
          preference,
          date,
          description,
          start_time,
          end_time,
        } = task;
        return {
          type: typeOfJob,
          date,
          description,
          required: numberOfPeople,
          preference,
          time: { start: start_time, end: end_time },
          requests: { sent: [], received: [] },
          assigned: [],
        };
      });

      // Send the new tasks!
      const finalDBData = { volunteers: { opportunities: tasksToBeSentToDB } };

      await apiCall(
        this.state.token,
        `/relief-center/${this.state.reliefCenterID}/tasks/add`,
        "PUT",
        tasksToBeSentToDB
      );

      // Get the submitted Table with a Button to Reset the tasks and add new/more tasks
      this.setState({
        isSubmitTableVisible: true,
        isReliefCenterFormVisible: false,
      });
    } else {
      this.setState({
        submitError: { ...this.state.submitError, isSet: true },
      });
    }
  };

  // Handle Relief Center Change
  onReliefCenterChange = (e) => {
    // Find the object.. in tasks.. and update the concerned value.
    const reliefCenterName = e.target.value;
    const foundIndex = this.state.reliefCenters.findIndex(
      (reliefCenter) => reliefCenter.name == reliefCenterName
    );

    const reliefCenterID = this.state.reliefCenters[foundIndex]["_id"];

    console.log(reliefCenterID);
    this.setState({ reliefCenterName, reliefCenterID });
  };

  // Handle Description Change
  onDescriptionChange = (e, taskID) => {
    // Get the Preference
    const description = e.target.value;

    // Find the object.. in tasks.. and update the concerned value.
    const { tasks } = this.state;
    const foundIndex = tasks.findIndex((task) => task.taskID == taskID);

    tasks[foundIndex]["description"] = description;
    this.setState({ tasks });
  };

  // Go To Add New Relief Center Page
  addNewReliefCenter = () => {
    this.props.history.push(`/dashboard/relief-center/new`);
  };

  // Handle Relief Center Form Reset
  resetReliefCenterForm = () => {
    this.setState({
      isReliefCenterFormVisible: true,
      isSubmitTableVisible: false,
      tasks: [],
      reliefCenterName: "",
    });
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
    onTypeOfJobChange,
  }) => (
    <Card
      taskID={taskID}
      style={{ padding: 50, marginBottom: 25, backgroundColor: "#eee" }}>
      {numberOfPeople > 0 && typeOfJob && (
        <Typography
          align="left"
          variant="h4"
          style={{ marginBottom: 30, fontWeight: 200 }}>
          Requesting {numberOfPeople} volunteer(s) for {typeOfJob}
        </Typography>
      )}

      <Grid
        container
        justify="flex-start"
        spacing={5}
        style={{ marginBottom: 15 }}>
        <Grid xs={4} item>
          <InputLabel
            id="volunteerDetail"
            align="left"
            shrink
            style={{ color: "black", marginBottom: 10 }}>
            Type of Job
          </InputLabel>

          {/* Type of Task (Job)! */}
          <Select
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeOfJob}
            style={{ backgroundColor: "white" }}
            fullWidth
            onChange={(e) => onTypeOfJobChange(e, taskID)}>
            {this.state.volunteeringTypes.map((volunteeringType) => (
              <MenuItem value={volunteeringType.name}>
                {volunteeringType.name}
              </MenuItem>
            ))}
            {/* <MenuItem value={"Driving"}>Driving</MenuItem>
            <MenuItem value={"Baby Sitting"}>Baby Sitting</MenuItem>
            <MenuItem value={"Cooking"}>Cooking</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem> */}
          </Select>
        </Grid>

        <Grid xs={3} item>
          <InputLabel
            id="volunteerDetail"
            align="left"
            shrink
            style={{ color: "black", marginBottom: 10 }}>
            People Needed
          </InputLabel>
          {/* Number of people needed */}
          <TextField
            variant="outlined"
            InputLabelProps={{ style: { color: "black" } }}
            defaultValue={numberOfPeople || 1}
            onChange={(e) => onNumberOfPeopleChange(e, taskID)}
            type="number"
            fullWidth
            InputProps={{
              inputProps: {
                max: 25,
                min: 1,
              },
              style: { backgroundColor: "white" },
            }}></TextField>
        </Grid>
      </Grid>

      {/* Preference */}
      <RadioGroup
        aria-label="preference"
        name="preference"
        value={preference}
        onChange={(e) => onPreferenceChange(e, taskID)}>
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
          onDateChange={(e) => this.handleDateTimeChange(e, taskID, "date")}
          onStartTimeChange={(e) =>
            this.handleDateTimeChange(e, taskID, "start_time")
          }
          onEndTimeChange={(e) =>
            this.handleDateTimeChange(e, taskID, "end_time")
          }
        />
      )}

      <TextField
        variant="outlined"
        style={{ marginTop: 15 }}
        onChange={(e) => this.onDescriptionChange(e, taskID)}
        fullWidth
        InputProps={{
          style: { backgroundColor: "white" },
        }}
        label="Task Description"></TextField>
    </Card>
  );

  // Lifecycle Methods
  async componentDidMount() {
    // Get Token from Redux
    const { token } = this.props.auth;

    // Set Token
    this.setState({ token });

    // Get Relief Centers & Volunteering Types
    const reliefCenters = await apiCall(token, `/relief-center`, "GET");
    const volunteeringTypes = await apiCall(token, `/volunteering-type`, "GET");

    this.setState({
      reliefCenters: reliefCenters.data,
      volunteeringTypes: volunteeringTypes.data,
    });
  }

  render() {
    const {
      reliefCenterName,
      tasks,
      isSubmitTableVisible,
      isReliefCenterFormVisible,
      isErrorVisible,
      submitError,
    } = this.state;
    return (
      <ThemeProvider theme={Theme}>
        {/* Error Message Box */}
        {!reliefCenterName && (
          <Alert severity="info">
            Please select an existing Relief Center or create a new one!
          </Alert>
        )}

        {/* Submit Error Message Box */}
        {submitError.isSet && (
          <Alert severity="error">{submitError.message}</Alert>
        )}

        {/* Submitted Card */}
        {isSubmitTableVisible && (
          <>
            <Alert severity="success">
              <AlertTitle>
                {reliefCenterName} Form Submission Succcess
              </AlertTitle>
              {this.state.tasks.length} task(s) were added to {reliefCenterName}
            </Alert>
            <Card>
              <SubmittedTasksTableComponent tasks={tasks} />
            </Card>

            <Button onClick={this.resetReliefCenterForm}>Add More</Button>
          </>
        )}

        {/* Relief Center Form */}
        {isReliefCenterFormVisible && (
          <>
            {/* Top Header & Add New Button */}
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ marginTop: 20, marginBottom: 20 }}>
              <Grid item>
                {/* Panel Title - Relief Center Form */}
                <Typography align="left" variant="h3">
                  {reliefCenterName == null || reliefCenterName == ""
                    ? "Relief Center Form"
                    : `${reliefCenterName} Form`}
                </Typography>
              </Grid>
              <Grid item align>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={this.addNewReliefCenter}>
                  <AddCircleOutlineIcon />
                  &nbsp;Add New
                </Button>
              </Grid>
            </Grid>
            <Card style={{ padding: 50 }}>
              {/* Relief Center Name Input */}
              <Card
                style={{
                  padding: 50,
                  marginBottom: 25,
                  backgroundColor: "#eee",
                }}>
                <InputLabel
                  align="left"
                  style={{ marginBottom: 15, color: "black" }}>
                  Select Relief Center Name
                </InputLabel>
                {/* Relief Center Selection! */}
                <Select
                  variant="outlined"
                  placeholder="Select Relief Center Name"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={reliefCenterName}
                  fullWidth
                  style={{ backgroundColor: "white" }}
                  onChange={(e) => this.onReliefCenterChange(e)}>
                  {this.state.reliefCenters.map((reliefCenter) => (
                    <MenuItem value={reliefCenter.name}>
                      {reliefCenter.name}
                    </MenuItem>
                  ))}
                </Select>
              </Card>
              {/* Task Cards */}
              {tasks.map((task, index) => {
                const {
                  taskID,
                  numberOfPeople,
                  nameOfJob,
                  description,
                  typeOfJob,
                  date,
                  start_time,
                  end_time,
                  preference,
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
              <Grid
                container
                direction="column"
                spacing={5}
                justify="space-evenly">
                <Grid item>
                  {/* Button to Add More Task Cards */}
                  <Button onClick={this.addForm}>
                    ADD TASK <AddCircleOutlineIcon />
                  </Button>
                </Grid>
                <Grid item>
                  {/* Submit Button */}
                  <Button
                    variant="contained"
                    onClick={this.handleSubmitReliefCenterForm}>
                    Submit
                  </Button>
                </Grid>
              </Grid>{" "}
            </Card>
          </>
        )}
      </ThemeProvider>
    );
  }
}

// Redux - Map (Redux) State -> props
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(withRouter(ReliefCenterForms));
