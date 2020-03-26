// Request here

import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./types";

export const getAuth = () => {
  if (true) {
    return {
      type: LOGIN_SUCCESS,
      payload: {
        token: "SAMPLE_TOKEN",
        user: { name: "Angel Augustine" },
        isAuthenticated: true
      }
    };
  } else {
    return {
      type: LOGIN_FAILURE
    };
  }
};
