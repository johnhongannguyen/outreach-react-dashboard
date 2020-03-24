import React from "react";

// Core Material UI Imports
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider
} from "@material-ui/core";

// Icon Imports
import {
  Home as HomeIcon,
  People as PeopleIcon,
  EmojiPeople as ReliefCenterIcon,
  Description as FormIcon,
  Settings as SettingsIcon
} from "@material-ui/icons";

// React Router
import { Link, BrowserRouter } from "react-router-dom";

// Custom Components and Themes
import Theme from "../../theme";

export const mainListItems = (
  <ThemeProvider theme={Theme}>
    <ListItem
      autoFocus
      button
      component={Link}
      to={{ pathname: "/dashboard/", state: "flushDeal" }}
    >
      <ListItemIcon>
        <HomeIcon color="primary" />
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{
          style: { color: "white" }
        }}
        primary="Home"
      />
    </ListItem>
    <ListItem
      // selected={.pathname === "/dashboard/"}
      button
      component={Link}
      to={{ pathname: "/dashboard/volunteers", state: "flushDeal" }}
    >
      <ListItemIcon>
        <PeopleIcon color="primary" />
      </ListItemIcon>
      <ListItemText
        primary="Volunteers"
        primaryTypographyProps={{
          style: { color: "white" }
        }}
      />
    </ListItem>
    <ListItem
      button
      component={Link}
      to={{ pathname: "/dashboard/relief-centers", state: "flushDeal" }}
    >
      <ListItemIcon>
        <ReliefCenterIcon color="primary" />
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{
          style: { color: "white" }
        }}
        primary="Relief Centers"
      />
    </ListItem>
    <ListItem
      button
      component={Link}
      to={{ pathname: "/dashboard/relief-center-forms", state: "flushDeal" }}
    >
      <ListItemIcon>
        <FormIcon color="primary" />
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{
          style: { color: "white" }
        }}
        primary="Relief Center Forms"
      />
    </ListItem>
    <ListItem
      button
      component={Link}
      to={{ pathname: "/dashboard/settings", state: "flushDeal" }}
    >
      <ListItemIcon size="large">
        <SettingsIcon color="primary" />
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{
          style: { color: "white" }
        }}
        primary="Settings"
      />
    </ListItem>
  </ThemeProvider>
);
