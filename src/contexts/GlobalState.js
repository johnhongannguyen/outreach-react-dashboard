import React, { createContext, useReducer } from "react";
import AppReducer from "../reducers/AppReducer";

// Initial state
const initialState = {
  notifications: [
    {
      id: 1,
      title: "Volunteer Request",
      content: "New request from Mr. John Doe"
    },
    {
      id: 2,
      title: "Reminder",
      content: "Volunteering at Surrey, BC, Canada in 2 days"
    }
  ]
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
        deleteNotification,
        addNotification
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
