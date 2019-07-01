import React from "react";
import ReactDOM from "react-dom";
import "./Resources/css/app.css";

import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";
import { firebase } from "./firebase";

const App = props => {
  return (
    <Router>
      <Routes {...props} />
    </Router>
  );
};

// check to see if use is authorized
firebase.auth().onAuthStateChanged(user => {
  ReactDOM.render(<App user={user} />, document.getElementById("root"));
});
