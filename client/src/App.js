import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Main from "./Components/Main/Main";
import "./styles/base.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact >
            <Main />
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
