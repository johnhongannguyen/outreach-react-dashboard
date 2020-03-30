import React, { Component } from "react";

// Material UI
import { Grid, Typography, Button } from "@material-ui/core";

// Icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

export class NewReliefCenterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reliefCenterName: ""
    };
  }

  render() {
    const { reliefCenterName } = this.state;
    return (
      <>
        {/* Top Header & Add New Button */}
        <Grid container justify="space-between">
          {/* Panel Title - Relief Center Form */}
          <Typography align="left" variant="h3">
            {reliefCenterName == null || reliefCenterName == ""
              ? "New Relief Center Form"
              : `${reliefCenterName} Form`}
          </Typography>
        </Grid>
      </>
    );
  }
}

export default NewReliefCenterForm;
