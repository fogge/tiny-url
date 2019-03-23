import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    user: false
  };

  componentDidMount() {

  }

  createUser = () => {
    axios
      .post("api/createUser", {
        email: "hello@test.com"
      })
      .then(res => {
        console.log(res);
        this.getUser();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getUser = () => {
      fetch("api/getUser")
      .then(res => res.json())
      .then(res => this.setState({ user: res.data[0].email}))
      .catch(err => {
        console.log(err);
        this.createUser();
      });
  };

  render() {
    if(!this.state.user) {
      this.getUser();
    }
    return (
      <div className='App'>
        <h1>MERN-Setup complete</h1>
        <p>This user was fetched: {this.state.user ? this.state.user : "No user found"}</p>
      </div>
    );
  }
}

export default App;
