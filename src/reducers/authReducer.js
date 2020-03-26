import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/types";

const initialState = {
  isWaiting: false,
  isAuthenticated: false,
  user: null,
  token: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isWaiting: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isWaiting: false,
        isAuthenticated: false
      });
    default: {
      return state;
    }
  }
}
