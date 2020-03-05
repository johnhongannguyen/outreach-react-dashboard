import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Global State
import { GlobalContext } from "../../contexts/GlobalState";

// Material UI - Core - Imports
import {
  Drawer,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
  Link,
  Menu,
  MenuItem,
  Button,
  Avatar
} from "@material-ui/core";

// Material UI - Icons - Imports
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Notifications as NotificationsIcon
} from "@material-ui/icons";

import { mainListItems } from "./listItems";

// Custom Outreach Dashboard Components
import ReliefCenterForms from "./ReliefCenterForms";
import Volunteers from "./Volunteers";
import ReliefCenters from "./ReliefCenters";
import Home from "./Home";

// Copyright Component
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  // Getting notifications from the Global State!
  const { notifications } = useContext(GlobalContext);

  const [open, setOpen] = React.useState(true);
  const [anchorNotifications, setAnchorNotifications] = React.useState(null);
  const [anchorUserMenu, setAnchorUserMenu] = React.useState(null);

  const [notificationsOpen, setNotificationsOpen] = React.useState(
    Boolean(anchorNotifications)
  );

  const [userMenuOpen, setUserMenuOpen] = React.useState(
    Boolean(anchorNotifications)
  );

  // UserMenuToggle Handlers
  const handleUserMenuClick = event => {
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
  const handleNotificationsClick = event => {
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

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          {/* Dashboard Toolbar */}
          <Toolbar className={classes.toolbar}>
            {/* Menu Icon on Left */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            {/* Text in the center */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Outreach Admin Panel
            </Typography>
            {/* Notifications on the Right */}
            <IconButton onClick={handleNotificationsClick} color="inherit">
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
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
                    width: 200
                  }
                }}
              >
                {notifications.map(notification => (
                  <MenuItem
                    key={notification.id}
                    onClick={handleNotificationsClose}
                  >
                    <div>{notification.title}</div>
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
                alt="Blandy Castro"
                src="https://avatars1.githubusercontent.com/u/109951?s=400&v=4"
                className={classes.orange}
              >
                {/* Fallback: Initials of the person who's logged in */}
                BC
              </Avatar>
              &nbsp; Blandy Castro
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={anchorUserMenu}
              keepMounted
              open={Boolean(anchorUserMenu)}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleUserMenuClose}>Sign Out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            {/* App Name */}
            Outreach
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {/* Changing Components Here */}

            <Switch>
              {/* Dashboard Route */}
              <Route path="/dashboard/home">
                <Home />
              </Route>

              {/* Volunteers Route */}
              <Route path="/dashboard/volunteers">
                <Volunteers />
              </Route>

              {/* Relief Centers Route */}
              <Route path="/dashboard/relief-centers">
                <ReliefCenters />
              </Route>

              {/* Relief Center Forms Route */}
              <Route path="/dashboard/relief-center-forms">
                <ReliefCenterForms />
              </Route>

              {/* Settings Route */}
              <Route path="/dashboard/settings">
                <div>Settings</div>
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
