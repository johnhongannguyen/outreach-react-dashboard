import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// Moment!
import moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

export default function SubmittedTasksTableComponent({ tasks }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type of Job</TableCell>
            <TableCell align="right">People Needed</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map(task => (
            <TableRow key={task.taskID}>
              <TableCell component="th" scope="row">
                {task.typeOfJob}
              </TableCell>
              <TableCell align="right">{task.numberOfPeople}</TableCell>
              <TableCell align="right">
                {task.preference === "preference"
                  ? moment(task.date).format("MM-DD-YYYY")
                  : "N/A"}
              </TableCell>

              <TableCell align="right">
                {task.preference === "preference"
                  ? moment(task.start_time).format("hh:MM A")
                  : "N/A"}
              </TableCell>
              <TableCell align="right">
                {task.preference === "preference"
                  ? moment(task.end_time).format("hh:MM A")
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
