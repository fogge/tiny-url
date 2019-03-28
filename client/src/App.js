import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Test from "./Components/Main";
import "./styles/base.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact >
            <Test />
          </Route>
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
