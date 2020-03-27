import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

// Save to local storage (Component will unmount is a better solution)
const saveToLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.log(error);
  }
};

// Load from Local Storage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    // React Redux only likes undefined - no null please!
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    // If the browser does not support local storage
    return undefined;
  }
};

// Get form Local Storage
const persistedState = loadFromLocalStorage();

// Create Store
const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// Update Local Storage on State update
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
