import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import "./styles/base.scss";

class App extends Component {
  render() {
    console.log("hello");
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Header}>
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route component={() => window.location = `api${window.location.pathname}`} />
        </Switch>

      </Router>
    );
  }
}

export default App;
