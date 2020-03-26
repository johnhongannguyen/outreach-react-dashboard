import React, { Component } from "react";

// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Custom Components
import Dashboard from "./pages/Dashboard/Dashboard";
import ContactPage from "./pages/ContactPage/ContactPage.js";
import TeamPage from "./pages/TeamPage/TeamPicture.js";
import { SignInPage } from "./pages/SignInPage";
import LandingPage from "./pages/LandingPage";

// Getting Auth (was in Home during the example follow-up)
import { connect } from "react-redux";
import { getAuth } from "./actions/authActions";

//
export class ConnectedApp extends Component {
  // Get isAuthenticated from Redux
  componentDidMount() {
    // React Redux
    this.props.getAuth();
  }

  render() {
    // Redux
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="App">
        <Router>
          <Switch>
            {/* Dashboard Route */}
            <Route
              path="/dashboard/"
              render={() =>
                isAuthenticated ? <Dashboard /> : <Redirect to="/login" />
              }
            />

            {/* Login Page Route */}
            <Route
              path="/login"
              render={() =>
                !isAuthenticated ? (
                  <SignInPage />
                ) : (
                  <Redirect to="/dashboard/" />
                )
              }
            />

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
}

// Redux
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getAuth })(ConnectedApp);
