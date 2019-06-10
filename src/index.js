import React from "react";
import ReactDOM from "react-dom";
import "./Resources/css/app.css";

import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";

const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
