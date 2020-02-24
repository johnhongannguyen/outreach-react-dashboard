import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems } from "./listItems";
import Avatar from "@material-ui/core/Avatar";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Global State
import { GlobalContext } from "../../contexts/GlobalState";
import ReliefCenterForms from "./ReliefCenterForms";
import Volunteers from "./Volunteers";
import ReliefCenters from "./ReliefCenters";
import Home from "./Home";

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

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationsOpen, setNotificationsOpen] = React.useState(
    Boolean(anchorEl)
  );

  const handleClick = event => {
    console.log("Handle Click Called!");

    // Get the Target to position and achor the menu!
    setAnchorEl(event.currentTarget);
    // Toggle Notifications onClick
    setNotificationsOpen(!notificationsOpen);
  };

  const handleClose = () => {
    console.log("Handle Close Called!");
    setAnchorEl(null);
    setNotificationsOpen(false);
  };

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
            <IconButton onClick={handleClick} color="inherit">
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>

              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={notificationsOpen}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    // maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200
                  }
                }}
              >
                {notifications.map(notification => (
                  <MenuItem key={notification.id} onClick={handleClose}>
                    <div>{notification.title}</div>
                    {notification.content}
                  </MenuItem>
                ))}
              </Menu>
            </IconButton>
            {/* Avatar on the rightmost end */}
            <Avatar
              alt="Remy Sharp"
              src="/broken-image.jpg"
              className={classes.orange}
            >
              B
            </Avatar>
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

              {/* Volunteers Route */}
              <Route path="/dashboard/relief-centers">
                <ReliefCenters />
              </Route>

              {/* Volunteers Route */}
              <Route path="/dashboard/relief-center-forms">
                <ReliefCenterForms />
              </Route>

              {/* Volunteers Route */}
              <Route path="/dashboard/settings">
                <div>Settings</div>
              </Route>
            </Switch>

            {/* <Grid container spacing={3}>
           
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
          
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid> */}

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
