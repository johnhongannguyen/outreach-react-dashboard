import React, { useState } from "react";
import "./App.css";

// Redux Provider
import { Provider } from "react-redux";
import store from "./store";

// Connected App
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

// Home.propTypes = {
//   getItems: PropTypes.func.isRequired,
//   item: PropTypes.object.isRequired
// };

// export default connect(mapStateToProps, { getItems })(withStyles(styles)(Home));
export default App;
