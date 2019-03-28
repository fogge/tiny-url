import React, { Component } from "react";
import "./Main.scss";
import "../Header/Header.scss";
import MainContent from "./MainContent"
import Header from "../Header/Header"


export default class Main extends Component {
  state = {
    url: "",
    isTrueUrl: false,
    lastTenLinks: [],
    error: false,
    success: false
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

  submit = (e) => {
    e.preventDefault();
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
          this.setState({ success: true, error: false, url: '' });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ success: false, error: true });
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
    let isAllCollapsed = this.state.lastTenLinks.every(link => link.showTarget === true);
    console.log(index);
    let lastTenLinks = [...this.state.lastTenLinks];
    lastTenLinks.map((link, _index) => {
      if(index === 'all') {
        link.showTarget = !isAllCollapsed;
        return link
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
      console.log(link)
      if (_index === index) {
        link.isCopied = true;
      } else {
        link.isCopied = false;
      }
      return link;
    });
    this.setState({ lastTenLinks });

    let url = this.state.lastTenLinks[index].tinyUrl;
    let inputField = document.querySelector('#copy-to-clipboard')
    inputField.value = this.createFullLink(url) 
    inputField.select();
    document.execCommand('copy');
  }

  render() {
    let headerProps = {
      isTrueUrl: this.state.isTrueUrl,
      url: this.state.url,
      onChangeHandler: this.onChangeHandler,
      submit: this.submit,
      error: this.state.error,
      success: this.state.success
    }

    let mainProps = {
      lastTenLinks: this.state.lastTenLinks,
      handleArrow:  this.handleArrow,
      createFullLink: this.createFullLink,
      copyToClipboard: this.copyToClipboard
    }


    return (
      <React.Fragment>
        <Header {...headerProps} />
        <MainContent {...mainProps} />        
      </React.Fragment>
    );
  }
}
