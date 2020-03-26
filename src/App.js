import React from "react";
import "./App.css";

// Redux Provider
import { Provider } from "react-redux";
import store from "./store";

// Connected App (with Redux Store)
import ConnectedApp from "./ConnectedApp";

// App
class App extends React.Component {
  render() {
    return (
      // Redux Provider
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );
  }
}

export default App;
