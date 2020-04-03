import React, { useState } from "react";

// Material UI
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Collapse,
  Typography,
  ThemeProvider
} from "@material-ui/core";

// Labs
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

// Theme
import Theme from "../theme";

// Redux
// Getting Auth (was in Home during the example follow-up)
import { connect } from "react-redux";
import { setAuthAndUnlockDashBoard } from "../actions/authActions";

// Axios
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://outreach.nikhilwadekar.com">
        Outreach
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/ZbuP5oXM_zA)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const SignInPage = ({ setAuthAndUnlockDashBoard }) => {
  const classes = useStyles();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  // const [alert, setAlert] = useState(null);

  // On Form Submit
  const handleFormSubmit = e => {
    e.preventDefault();

    axios
      .post("/api/auth/login", {
        email: email,
        password: password
      })
      .then(response => {
        if (response) setAuthAndUnlockDashBoard(response.data);
      })
      .catch(err => {
        console.log("Error:", err);
      });
  };

  return (
    <ThemeProvider theme={Theme}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <img src="outreach_logo.png" width="100" />
            <Typography component="h1" variant="h5">
              Admin Login
            </Typography>

            <form
              className={classes.form}
              action="/api/auth/login"
              method="POST"
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleFormSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

// Redux - Map State to Sign In Page props
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setAuthAndUnlockDashBoard })(
  SignInPage
);
