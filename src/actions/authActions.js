// Request here

import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./types";

// Unlock Dashboard
export const setAuthAndUnlockDashBoard = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token: user.token ? user.token : "",
      user: user
    }
  };
};

// Log Out
export const logOut = () => {
  return {
    type: LOGIN_FAILURE
  };
};
