import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className='header-overlay'>
          <h1>A link-shortener for everyone</h1>
          <form className='url-maker-container'>
            <input
              className={this.props.isTrueUrl ? "input-success" : "input-error"}
              value={this.props.url}
              type='url'
              name='homepage'
              onChange={e => this.props.onChangeHandler(e)}
              placeholder="Paste a link and I'll shorten it for you"
            />
            <button onClick={e => this.props.submit(e)}>Shorten link</button>
          </form>
          {this.props.error && (
            <p className='error'>The link provided could not be shortened.</p>
          )}
          {this.props.success && (
            <p className='success'>
              Link shortened! Check highest in the list.
            </p>
          )}
        </div>
        {/* This is only for copy, a hidden element */}
        <input id="copy-to-clipboard" type="text" />
      </header>
    );
  }
}
