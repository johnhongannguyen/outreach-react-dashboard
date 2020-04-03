import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Material UI
import {
  Grid,
  Typography,
  Button,
  Card,
  TextField,
  InputAdornment,
  ThemeProvider
} from "@material-ui/core";

// Axios
import axios from "axios";

// Theme
import Theme from "../../../theme";

// Icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Search as SearchIcon } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";

// API URL
const API_URL = process.env.REACT_APP_API_URL;

export class NewReliefCenterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reliefCenterName: "",
      reliefCenterDescription: "",
      reliefCenterLocation: "",
      successMessage: null,
      errorMessage: null
    };
  }

  // Handle Relief Center Submit
  handleReliefCenterSubmit = () => {
    const {
      reliefCenterName,
      reliefCenterDescription,
      reliefCenterLocation
    } = this.state;

    // Create a new one
    if (
      !!reliefCenterName &&
      !!reliefCenterDescription &&
      !!reliefCenterLocation
    ) {
      // Construct the Relief Center
      const reliefCenter = {
        volunteers: {
          opportunities: []
        },
        name: reliefCenterName,
        description: reliefCenterDescription,
        location: reliefCenterLocation,
        successMessage: null
      };

      // POST it!
      axios.post(`${API_URL}/relief-center/create`, reliefCenter).then(res => {
        if (res.status === 201) {
          let successMessage = `${this.state.reliefCenterName} created! `;

          // Created!

          this.setState({
            reliefCenterName: "",
            reliefCenterDescription: "",
            reliefCenterLocation: "",
            successMessage,
            errorMessage: null
          });
        }
      });
    } else {
      this.setState({
        successMessage: null,
        errorMessage: "Fields not filled."
      });
    }
  };

  render() {
    const {
      reliefCenterName,
      reliefCenterDescription,
      reliefCenterLocation,
      successMessage,
      errorMessage
    } = this.state;
    return (
      <ThemeProvider theme={Theme}>
        {/* Top Header & Add New Button */}
        {successMessage && (
          <Grid container justify="center">
            <Alert
              action={
                <Button
                  onClick={() =>
                    this.props.history.push(`/dashboard/relief-center-forms`)
                  }
                  variant="contained"
                  size="small"
                >
                  Add Tasks
                </Button>
              }
            >
              {successMessage}
            </Alert>
          </Grid>
        )}

        {errorMessage && (
          <Grid container justify="center">
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
        )}
        <Grid container justify="center" spacing={4}>
          {/* Relief Center Name Input */}
          <Card
            style={{
              padding: 25,
              marginBottom: 25,
              marginTop: 25,
              maxWidth: 650
            }}
          >
            {/* Panel Title - Relief Center Form */}
            <Typography align="left" variant="h4">
              New Relief Center Form
            </Typography>
            {/* Name */}
            <TextField
              error={
                reliefCenterName.length < 5 && reliefCenterName.length !== 0
              }
              autoFocus
              margin="normal"
              // helperText="Hello"
              fullWidth
              onChange={event =>
                this.setState({ reliefCenterName: event.target.value })
              }
              label="Title"
              // type="search"
              variant="standard"
              value={reliefCenterName}
            />

            {/* Description */}
            <TextField
              fullWidth
              error={
                reliefCenterDescription.length < 2 &&
                reliefCenterDescription.length !== 0
              }
              margin="normal"
              helperText="Describe the relief center in short, it shall be displayed along with the opportunities presented to volunteers."
              onChange={event =>
                this.setState({ reliefCenterDescription: event.target.value })
              }
              inputProps={{ style: { fontFamily: "Open Sans" } }} // font size of input text
              label="Description"
              // type="search"
              variant="standard"
              value={reliefCenterDescription}
            />

            {/* Location */}
            <TextField
              fullWidth
              error={
                reliefCenterDescription.length < 5 &&
                reliefCenterDescription.length !== 0
              }
              margin="normal"
              helperText="Can be the exact address or a landmark."
              onChange={event =>
                this.setState({ reliefCenterLocation: event.target.value })
              }
              label="Location"
              // type="search"
              variant="standard"
              value={reliefCenterLocation}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={this.handleReliefCenterSubmit}
            >
              Submit
            </Button>
          </Card>
        </Grid>
      </ThemeProvider>
    );
  }
}

export default withRouter(NewReliefCenterForm);
