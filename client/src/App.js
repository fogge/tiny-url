import React, { Component } from "react";
import Footer from './Components/Footer/Footer';
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
import './styles/base.scss';


class App extends Component {


  render() {
    return (
      <div className='App'>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
