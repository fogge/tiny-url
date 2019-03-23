import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import "./styles/base.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact >
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route path='/test' exact component={Header} />
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
