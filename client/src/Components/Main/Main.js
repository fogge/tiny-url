import React, { Component } from "react";
import "./Main.scss";
import { ClipBoard, Arrow } from "../Svgs/Svgs";

export default class Main extends Component {
  state = {
    url: "",
    isTrueUrl: false,
    lastTenLinks: [],
    error: false
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

  addHttpToLink = url => {
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    return url;
  };

  submit = () => {
    if (this.state.isTrueUrl) {
      let webUrl = this.addHttpToLink(this.state.url);
      let data = {
        webUrl,
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
          this.setState({ error: false });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ error: true });
      // Error here
    }
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

  handleArrow = index => {
    let lastTenLinks = [...this.state.lastTenLinks];
    lastTenLinks.map((link, _index) => {
      if (_index === index && link.showTarget) {
        link.showTarget = false;
      } else if (_index === index) {
        link.showTarget = true;
      } else {
        link.showTarget = false;
      }
      return link;
    });

    this.setState({ lastTenLinks });
  };

  render() {
    return (
      <React.Fragment>
        <header>
          <div className='header-overlay'>
            <h1>A link-shortener for everyone</h1>
            <div className='url-maker-container'>
              <input
                className={
                  this.state.isTrueUrl ? "input-success" : "input-error"
                }
                value={this.state.url}
                type='url'
                name='homepage'
                onChange={e => this.onChangeHandler(e)}
                placeholder="Paste a link and I'll shorten it for you"
              />
              <button onClick={this.submit}>Shorten link</button>
            </div>{" "}
            {this.state.error && (
                <p className='error'>The link provided could not be shortened.</p>
            )}
          </div>
        </header>

        <main>
          <h2>Your 10 last created links</h2>

          <div className='link-list-holder'>
            <ol>
              <li>
                <h4>Tiny Link:</h4>
              </li>
              {this.state.lastTenLinks.map((link, index) => {
                return (
                  <li key={link.tinyUrl}>
                    <div
                      className='svg-holder'
                      onClick={() => this.handleArrow(index)}
                    >
                      <Arrow
                        className={
                          link.showTarget ? "arrow-down" : "arrow-left"
                        }
                      />
                    </div>

                    <div className='link-holder'>
                      <a
                        target='_blank'
                        href={this.createFullLink(link.tinyUrl)}
                      >
                        {this.createFullLink(link.tinyUrl)}
                      </a>


                        <a className={link.showTarget ? 'web-link' : 'web-link collapsed'} href={link.webUrl}>
                          {link.webUrl}
                        </a>
                    </div>

                    <div className='svg-holder'>
                      <ClipBoard className='copy' />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
