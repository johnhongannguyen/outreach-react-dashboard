import React from "react";

// Core Material UI Imports
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

// Icon Imports
import {
  Home as HomeIcon,
  People as PeopleIcon,
  EmojiPeople as ReliefCenterIcon,
  Description as FormIcon,
  Settings as SettingsIcon
} from "@material-ui/icons";

// React Router
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem
      button
      component={Link}
      to={{ pathname: "/dashboard/home", state: "flushDeal" }}
    >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to={{ pathname: "/dashboard/volunteers", state: "flushDeal" }}
    >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Volunteers" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to={{ pathname: "/dashboard/relief-centers", state: "flushDeal" }}
    >
      <ListItemIcon>
        <ReliefCenterIcon />
      </ListItemIcon>
      <ListItemText primary="Relief Centers" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to={{ pathname: "/dashboard/relief-center-forms", state: "flushDeal" }}
    >
      <ListItemIcon>
        <FormIcon />
      </ListItemIcon>
      <ListItemText primary="Relief Center Forms" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to={{ pathname: "/dashboard/settings", state: "flushDeal" }}
    >
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </div>
);
