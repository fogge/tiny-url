import React, { Component } from "react";
import { ClipBoard, Arrow } from "../Svgs/Svgs";

export default class MainContent extends Component {
  render() {
    return (
      <main>
        <h2>Your 10 last created links</h2>

        <div className='link-list-holder'>
          <ol>
            <li>
              <h4>Tiny Link:</h4>
            </li>
            {this.props.lastTenLinks.map((link, index) => {
              return (
                <li key={link.tinyUrl}>
                  <div
                    className='svg-holder'
                    onClick={() => this.props.handleArrow(index)}
                  >
                    <Arrow
                      className={link.showTarget ? "arrow-down" : "arrow-left"}
                    />
                  </div>
                  <div className='link-holder'>
                    <a target='_blank' className="tiny-link" href={this.props.createFullLink(link.tinyUrl)}>
                      {this.props.createFullLink(link.tinyUrl)}
                    </a>

                    <div
                      className={
                        link.showTarget ? "web-link" : "web-link collapsed"
                      }
                    >
                      <h4>TARGET:</h4>
                      <a href={link.webUrl}>{link.webUrl}</a>
                    </div>
                  </div>
                  <div className='svg-holder' onClick={() => this.props.copyToClipboard(index)}>
                    <ClipBoard className='copy' />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </main>
    );
  }
}
