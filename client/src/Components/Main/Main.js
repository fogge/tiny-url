import React, { Component } from "react";
import "./Main.scss";

export default class Main extends Component {
  state = {
    url: "",
    isTrueUrl: false,
    lastTenLinks: []
  };

  componentDidMount() {
    this.getLastTenLinks();
  }

  onChangeHandler = e => {
    let url = e.currentTarget.value;
    if (this.validateUrl(url)) {
      this.setState({ url, isTrueUrl: true });
    } else {
      this.setState({ url, isTrueUrl: false });
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

  getLastTenLinks = () => {
    fetch("api/getLinks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(links => {
        this.setState({
          lastTenLinks: links
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  submit = () => {
    let data = {
      webUrl: this.state.url,
      tinyUrl: this.randomizeString()
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
      .then(() => {
        this.getLastTenLinks();
      })
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

  createFullLink = tinyUrl => {
    return `${window.location.origin}/${tinyUrl}`;
  };

  render() {
    return (
      <main>
        <div className='main-content'>
          <h3>Make a tiny url here!</h3>
          <input
            className={this.state.isTrueUrl ? "input-success" : "input-error"}
            value={this.state.url}
            type='url'
            name='homepage'
            onChange={e => this.onChangeHandler(e)}
          />
          <button onClick={this.submit}>Create my url!</button>

          <div>
            <ul>
              {this.state.lastTenLinks.map(link => {
                return (
                  <li key={link.tinyUrl}>
                    Tiny:
                    <a href={this.createFullLink(link.tinyUrl)}>
                      {this.createFullLink(link.tinyUrl)}
                    </a>
                    - Target: <a href={link.webUrl}>{link.webUrl}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    );
  }
}
