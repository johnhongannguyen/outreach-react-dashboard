import React from "react";
import "./App.css";

// import { APP_NAME } from "./resources/GlobalVariables";

import SignInPage from "./pages/SignInPage";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalProvider } from "./contexts/GlobalState";
import Dashboard from "./pages/Dashboard/Dashboard";

// Component
function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Router>
          <Switch>
            {/* Dashboard Route */}
            <Route path="/dashboard">
              <Dashboard />
            </Route>

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
      </GlobalProvider>
    </div>
  );
}

export default App;
