import React, { Component } from "react";

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

// API URL
const API_URL = process.env.REACT_APP_API_URL;

export class NewReliefCenterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reliefCenterName: "",
      reliefCenterDescription: "",
      reliefCenterLocation: ""
    };
  }

  // Handle Relief Center Submit
  handleReliefCenterSubmit = () => {
    const {
      reliefCenterName,
      reliefCenterDescription,
      reliefCenterLocation
    } = this.state;

    // Construct the Relief Center
    const reliefCenter = {
      volunteers: {
        opportunities: []
      },
      name: reliefCenterName,
      description: reliefCenterDescription,
      location: reliefCenterLocation,
      picture_url: "" //Picture not needed.
    };

    // Create a new one
    axios.post(`${API_URL}/relief-center/create`, reliefCenter).then(res => {
      if (res.status === 201) {
        console.log(res.data);
      }
    });
  };

  render() {
    const {
      reliefCenterName,
      reliefCenterDescription,
      reliefCenterLocation
    } = this.state;
    return (
      <ThemeProvider theme={Theme}>
        {/* Top Header & Add New Button */}
        <Grid container justify="space-between"></Grid>
        <Grid container justify="center" spacing={4}>
          {/* Relief Center Name Input */}
          <Card style={{ padding: 25, marginBottom: 25, maxWidth: 650 }}>
            {/* Panel Title - Relief Center Form */}
            <Typography align="left" variant="h4">
              New Relief Center Form
            </Typography>
            {/* Name */}
            <TextField
              // error={reliefCenterName.length < 5}
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

export default NewReliefCenterForm;
