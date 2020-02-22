import React from "react";
import "./App.css";
import { APP_NAME } from "./resources/GlobalVariables";
import TestComponent from "./components/Test/TestComponent";
import Button from "@material-ui/core/Button";
import SignInPage from "./pages/SignInPage";
import LandingPage from "./pages/LandingPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Login Page Route */}
          <Route path="/login">
            <SignInPage />
          </Route>

          {/* Landing Page Route */}
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
