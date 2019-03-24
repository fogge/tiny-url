import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";
import "./styles/base.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact >
            <Main />
            <Footer />
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
