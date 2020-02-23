import React from "react";

// Create a new Context called 'AuthContext'
const AuthContext = React.createContext();

// New Component called AuthProvider
class AuthProvider extends React.Component {
  state = { isAuth: false };

  // Function to mimic Login
  login = () => {
    setTimeout(() => this.setState({ isAuth: true }), 1000);
  };

  //Function to immediately Logout
  logout = () => {
    this.setState({ isAuth: false });
  };

  render() {
    return (
      // Wrap our childer with the Context's Provider component
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout
        }}
      >
        {/* Render the childer (Our components that would use the global data from the Context) */}
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

// Assign the Context's Consumer to a new constant called 'AuthConsumer'
const AuthConsumer = AuthContext.Consumer;

// Export out the AuthProvider Component, AuthConsumer constant
export { AuthProvider, AuthConsumer };
