import React, { Component } from "react";
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';

class App extends Component {


  render() {
    return (
      <div className='App'>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
