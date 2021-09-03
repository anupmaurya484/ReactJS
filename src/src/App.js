import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import loginPage from "../src/pages/Login/loginPage";
import dashBoard from "../src/pages/Dashboard/dashBoard";


class App extends Component {
  state = {}
  render() {
    return (
      <Router>
      <Switch>
        <Route exact path="/" component={loginPage}>
          {/* <loginPage /> */}
        </Route>
        <Route exact path="/dashBoard" component={dashBoard}>
          {/* <dashBoard /> */}
        </Route>
      </Switch>
      </Router>
    );
  }
}

export default App;
