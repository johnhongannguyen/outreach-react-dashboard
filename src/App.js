import React from "react";
import "./App.css";
import { APP_NAME } from "./resources/GlobalVariables";
import TestComponent from "./components/Test/TestComponent";

function App() {
  return (
    <div className="App">
      <h1>This App is called {APP_NAME}</h1>
      <TestComponent />
    </div>
  );
}

export default App;
