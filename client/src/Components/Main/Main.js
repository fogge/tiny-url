import React, { Component } from "react";
import "./Main.scss";

export default class Main extends Component {
  state = {
    url: "",
    isTrueUrl: false
  };

  onChangeHandler = e => {
    let url = e.currentTarget.value;
    if (this.validateUrl(url)){
      this.setState({url, isTrueUrl: true})
    } else {
      this.setState({url, isTrueUrl: false})
    }
  };

  randomizeString = () => {
    let text = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++) {
      text += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return text;
  };

  submit = () => {
    let data = {
      webUrl: this.state.url,
      tinyUrl: this.randomizeString(),
      session: "Not set"
    };
    fetch("api/createLink", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .catch(err => {
        console.log(err);
      });
  };

  validateUrl = str => {
    let pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  render() {
    this.randomizeString();
    return (
      <main>
        <div className='main-content'>
          <h3>Make a tiny url here!</h3>
          <input
            className={this.state.isTrueUrl ? "input-success" : "input-error"}
            value={this.state.url}
            type="url"
            name="homepage"
            onChange={e => this.onChangeHandler(e)}
          />
          <button onClick={this.submit}>Create my url!</button>

        </div>

      </main>

    );
  }
}
