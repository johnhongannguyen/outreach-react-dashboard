import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "../auth/AuthContext";

export default class Dashboard extends Component {
  render() {
    <AuthConsumer>
      {({ isAuth }) => (
        <Route
          render={props =>
            isAuth ? <Component {...props} /> : <Redirect to="/" />
          }
          {...rest}
        />
      )}
    </AuthConsumer>;
  }
}
