import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";

// import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default function DateTimePicker() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container justify="space-around">
        <Grid xs={12} sm={4} item>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/DD/YY"
            margin="normal"
            id="date-picker-inline"
            label="Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
        <Grid xs={12} sm={4} item>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Start Time"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "start time"
            }}
          />
        </Grid>
        <Grid xs={12} sm={4} item>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="End Time"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "end time"
            }}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
