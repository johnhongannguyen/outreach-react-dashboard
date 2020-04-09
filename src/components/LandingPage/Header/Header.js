import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import outreachlogo from "../images/outreach_logo.png";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { Button, Box } from "@material-ui/core";
import "./Header.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

function useCurrentWitdh() {
  // save current window width in the state object
  let [width, setWidth] = useState(getWidth());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return width;
}

function Header() {
  let width = useCurrentWitdh();

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const preventDefault = (event) => event.preventDefault();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [links] = useState([
    { title: "Donate", to: "#" },
    { title: "Team", to: "/team" },
    { title: "Contact", to: "/contact" },
  ]);

  return (
    <div className={([classes.root], "header-main")}>
      <CssBaseline />

      <AppBar
        style={{ flexDirection: "row", alignItems: "center" }}
        position="absolute"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        {/* Logo */}

        <Link href="/" class="logo">
          <img
            src={outreachlogo}
            alt="Logo"
            className="header-outreach-logo"
            style={{ width: "6rem" }}
          />
        </Link>

        {width <= 767 && (
          <Toolbar style={{ flex: "30% 1", justifyContent: "flex-end" }}>
            {/* Hamburger - only on views less than 700px */}

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}>
              <MenuIcon style={{ fontSize: "3rem" }} />
            </IconButton>
          </Toolbar>
        )}

        {/* Menu Links for Desktop View - beyond 700px */}
        {width > 767 && (
          <div className="header-menu">
            <Typography>
              {links.map((link) => (
                <Link href={link.to}>{link.title}</Link>
              ))}

              <Button
                href="/login"
                size="lg"
                style={{ backgroundColor: "#F27821", color: "#fff" }}
                variant=""
                className="nl-btn">
                Sign In
              </Button>
            </Typography>
          </div>
        )}
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <List>
          {links.map((link, index) => (
            <ListItem component="a" href={link.to} button key={link.title}>
              <ListItemText primary={link.title} />
            </ListItem>
          ))}
          <ListItem
            key={"Sign In"}
            component="a"
            variant="outlined"
            href="/login">
            <ListItemText primary={"Sign In"} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Header;
