import React, { createContext, useReducer, useState } from "react";
import AppReducer from "../reducers/AppReducer";

let fakeData = require("../data/fakeData.json");
// Initial state
const initialState = {
  notifications: fakeData.notifications,
  requests: fakeData.requests
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteNotification(id) {
    dispatch({
      type: "DELETE_NOTIFICATION",
      payload: id
    });
  }

  function addNotification(notification) {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: notification
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        notifications: state.notifications,
        requests: state.requests,
        deleteNotification,
        addNotification
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
