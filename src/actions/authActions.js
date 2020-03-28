// Request here

import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./types";

// Unlock Dashboard
export const setAuthAndUnlockDashBoard = user => {
  if (user.role === "admin")
    return {
      type: LOGIN_SUCCESS,
      payload: {
        token: user.token ? user.token : "",
        user: user
      }
    };
  else
    return {
      type: LOGIN_FAILURE
    };
};

// Log Out
export const logOut = () => {
  return {
    type: LOGIN_FAILURE
  };
};
