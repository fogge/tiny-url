import React, { Component } from "react";
import "./Main.scss";
import "../Header/Header.scss";
import List from "../List/List";
import Header from "../Header/Header";

export default class Main extends Component {
  state = {
    url: "",
    isTrueUrl: false,
    lastTenLinks: [],
    error: false,
    success: false,
    deletionMessage: ""
  };

  componentDidMount() {
    this.getLastTenLinks();
  }

  onChangeHandler = e => {
    let url = e.currentTarget.value;
    if (this.validateUrl(url)) {
      this.setState({ error: false, success: false, url, isTrueUrl: true });
    } else {
      this.setState({ error: false, success: false, url, isTrueUrl: false });
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

  deleteAll = () => {
    fetch("api/deleteLinks", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        this.getLastTenLinks();
        this.setState({ deletionMessage: res.message });
      })
      .catch(err => {
        console.log(err);
      });
  };

  submit = e => {
    e.preventDefault();
    if (this.state.isTrueUrl && this.state.url) {
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
          this.setState({ success: true, error: false, url: "" });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ success: false, error: true });
    }
  };

  createFullLink = tinyUrl => {
    return `${window.location.origin}/${tinyUrl}`;
  };

  clearDeletionMessage = () => this.setState({ deletionMessage: "" });

  handleArrow = index => {
    let isAllCollapsed = this.state.lastTenLinks.every(
      link => link.showTarget === true
    );
    let lastTenLinks = [...this.state.lastTenLinks];
    lastTenLinks.map((link, _index) => {
      if (index === "all") {
        link.showTarget = !isAllCollapsed;
        return link;
      } else if (_index === index) {
        link.showTarget = !link.showTarget;
      }
      return link;
    });
    this.setState({ lastTenLinks });
  };

  copyToClipboard = index => {
    let lastTenLinks = [...this.state.lastTenLinks];
    lastTenLinks.map((link, _index) => {
      if (_index === index) {
        link.isCopied = true;
      } else {
        link.isCopied = false;
      }
      return link;
    });
    this.setState({ lastTenLinks });

    let url = this.state.lastTenLinks[index].tinyUrl;
    let inputField = document.querySelector("#copy-to-clipboard");
    inputField.value = this.createFullLink(url);
    inputField.select();
    document.execCommand("copy");
  };

  render() {
    let headerProps = {
      isTrueUrl: this.state.isTrueUrl,
      url: this.state.url,
      onChangeHandler: this.onChangeHandler,
      submit: this.submit,
      error: this.state.error,
      success: this.state.success
    };

    let mainProps = {
      lastTenLinks: this.state.lastTenLinks,
      handleArrow: this.handleArrow,
      createFullLink: this.createFullLink,
      copyToClipboard: this.copyToClipboard,
      deleteAll: this.deleteAll,
      deletionMessage: this.state.deletionMessage,
      clearDeletionMessage: this.clearDeletionMessage
    };

    return (
      <React.Fragment>
        <Header {...headerProps} />
        <List {...mainProps} />
      </React.Fragment>
    );
  }
}
