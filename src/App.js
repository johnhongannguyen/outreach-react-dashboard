import React, { useState } from "react";
import "./App.css";

import SignInPage from "./pages/SignInPage";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ContactPage from "./pages/ContactPage/ContactPage.js";
import TeamPage from "./pages/TeamPage/TeamPicture.js";

// Component
function App() {
  const [volunteerRequests, setVolunteerRequests] = useState([]);
  const value = { volunteerRequests, setVolunteerRequests };

  return (
    <div className="App">
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

          {/* Contact Page Route */}
          <Route path="/contact">
            <ContactPage />
          </Route>

          {/* Team Page Route */}
          <Route path="/team">
            <TeamPage />
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
