import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Material UI - Core - Imports
import {
  Drawer,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  Badge,
  Container,
  Link,
  Menu,
  MenuItem,
  Button,
  Avatar,
} from "@material-ui/core";

// Material UI - Icons - Imports
import {
  Menu as MenuIcon,
  NotificationsOutlined as NotificationsIcon,
} from "@material-ui/icons";

import { mainListItems } from "./listItems";

// Custom Outreach Dashboard Components
import ReliefCenterForms from "./ReliefCenterForms/ReliefCenterFormsv2";
import Volunteers from "./Volunteers/Volunteers";

import Home from "./Home/Home";

// Relief Centers
import ReliefCenters from "./ReliefCenters/ReliefCenters";
import AssignVolunteers from "./ReliefCenters/AssignVolunteers";
import AssignedVolunteers from "./ReliefCenters/AssignedVolunteers";
import RequestsSent from "./ReliefCenters/RequestsSent";
import RequestsReceived from "./ReliefCenters/RequestsReceived";
import Suggestions from "./ReliefCenters/Suggestions";

// Relief Center Forms
import NewReliefCenterForm from "./ReliefCenterForms/NewReliefCenterForm";

// Redux
// Getting Auth (was in Home during the example follow-up)
import { connect } from "react-redux";
import { setAuthAndUnlockDashBoard, logOut } from "../../actions/authActions";
import { apiCall } from "../../api";
// Logo
const outreachLogo = require("../../assets/outreach_logo.png");

// Copyright Component
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://outreach.nikhilwadekar.com/">
        Outreach
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    display: "flex",
    justifyContent: "flex-end",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    background: "#374052",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

function Dashboard({ logOut, auth }) {
  const classes = useStyles();
  const { user, token } = auth;
  const [open, setOpen] = React.useState(true);
  const [anchorNotifications, setAnchorNotifications] = React.useState(null);
  const [anchorUserMenu, setAnchorUserMenu] = React.useState(null);

  // Notifications from DB
  const [notifications, setNotifications] = React.useState([]);

  // Get Notifications from DB
  const getNotifications = () => {
    apiCall(token, `/notification/admin`, "GET")
      .then((res) => res.data)
      .then((notifications) => setNotifications(notifications))
      .catch((err) => console.log(err));
  };

  // Notifications Toggle
  const [notificationsOpen, setNotificationsOpen] = React.useState(
    Boolean(anchorNotifications)
  );

  // Menu Toggle
  const [userMenuOpen, setUserMenuOpen] = React.useState(
    Boolean(anchorNotifications)
  );

  // UserMenuToggle Handlers
  const handleUserMenuClick = (event) => {
    // Get the Target to position and achor the menu!
    setAnchorUserMenu(event.currentTarget);
    // Toggle UserMenu onClick
    setUserMenuOpen(!notificationsOpen);
  };

  const handleUserMenuClose = () => {
    setAnchorUserMenu(null);
    setUserMenuOpen(false);
  };
  // UserMenuToggle Handlers END

  // Notification Toggle Handlers
  const handleNotificationsClick = (event) => {
    // Get the Target to position and achor the menu!
    setAnchorNotifications(event.currentTarget);
    // Toggle Notifications onClick
    setNotificationsOpen(!notificationsOpen);
  };

  const handleNotificationsClose = () => {
    setAnchorNotifications(null);
    setNotificationsOpen(false);
  };
  // Notification Toggle Handlers END

  // Drawer Handlers
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Logout
  const handleLogout = () => {
    logOut();
  };

  React.useEffect(() => {
    getNotifications();

    return () => {
      // cleanup
    };
  }, []);

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          style={{ background: "transparent", boxShadow: "none" }}
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          {/* Dashboard Toolbar */}
          <Toolbar className={classes.toolbar}>
            {/* Menu Icon on Left */}
            <IconButton
              edge="start"
              color="danger"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>

            <IconButton
              onClick={notifications.length ? handleNotificationsClick : null}
            >
              <Badge badgeContent={notifications.length} color="primary">
                <NotificationsIcon color="primary" />
              </Badge>

              <Menu
                id="notifications-menu"
                anchorEl={anchorNotifications}
                keepMounted
                open={notificationsOpen}
                onClose={handleNotificationsClose}
                PaperProps={{
                  style: {
                    // maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                  },
                }}
              >
                {notifications.map((notification) => (
                  <MenuItem
                    key={notification._id}
                    onClick={handleNotificationsClose}
                  >
                    <div>{notification.action}</div>
                    {notification.content}
                  </MenuItem>
                ))}
              </Menu>
            </IconButton>

            {/* Profile + Avatar Button */}
            <Button
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleUserMenuClick}
            >
              <Avatar
                alt="User Photo"
                src="https://source.unsplash.com/JN0SUcTOig0/240x180"
                className={classes.orange}
              >
                {/* Fallback: Initials of the person who's logged in */}
                BC
              </Avatar>
              &nbsp; {user ? user.name : "Anonymous User"}
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={anchorUserMenu}
              keepMounted
              open={Boolean(anchorUserMenu)}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            {/* App Name */}
            <img src={outreachLogo} width={75} />
            {/* <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon color="primary" />
            </IconButton> */}
          </div>
          {/* <Divider /> */}
          <List>{mainListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {/* Changing Components Here */}

            <Switch>
              {/* Volunteers Route */}
              <Route path="/dashboard/volunteers">
                <Volunteers />
              </Route>

              {/* Relief Centers Route */}
              <Route path="/dashboard/relief-centers">
                <ReliefCenters />
              </Route>

              {/* Relief Centers Route */}
              <Route path="/dashboard/relief-center/new">
                <NewReliefCenterForm />
              </Route>

              {/* Relief Centers Route */}
              <Route path="/dashboard/relief-center/id/:reliefCenterID/assign">
                <AssignVolunteers />
              </Route>

              {/* Relief Centers Route - Assigned Volunteers */}
              <Route path="/dashboard/relief-center/id/:reliefCenterID/task/:taskID/assigned">
                <AssignedVolunteers />
              </Route>

              {/* Relief Centers Route - Pending Volunteers */}
              <Route path="/dashboard/relief-center/id/:reliefCenterID/task/:taskID/pending">
                <RequestsSent />
              </Route>

              {/* Relief Centers Route - Requests Received from Volunteers */}
              <Route path="/dashboard/relief-center/id/:reliefCenterID/task/:taskID/received">
                <RequestsReceived />
              </Route>

              {/* Relief Centers Route - Requests Received from Volunteers */}
              <Route path="/dashboard/relief-center/id/:reliefCenterID/task/:taskID/suggestions">
                <Suggestions />
              </Route>

              {/* Relief Center Forms Route */}
              <Route path="/dashboard/relief-center-forms">
                <ReliefCenterForms />
              </Route>

              {/* Settings Route */}
              <Route path="/dashboard/settings">
                <div>Settings</div>
              </Route>

              {/* Dashboard Route */}
              <Route path="/dashboard/">
                <Home />
              </Route>
            </Switch>

            {/* Bottom Copyright */}
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </Router>
  );
}

// Redux - Map State to Sign In Page props
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setAuthAndUnlockDashBoard,
  logOut,
})(Dashboard);
