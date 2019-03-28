import React, { Component } from "react";
import Svgs from "../Svgs/Svgs";

export default class MainContent extends Component {
  render() {
    let isAllCollapsed = this.props.lastTenLinks.every(link => link.showTarget === true);
    return (
      <main>
        <h2>Your 10 last created links</h2>

        <div className='link-list-holder'>
          <ol>
            <li>
              <Svgs.ArrowWithLine className={isAllCollapsed ? "arrow-line open" : "arrow-line"} onClick={() => this.props.handleArrow('all')}/>
              <h4>Tiny Link:</h4>
              <Svgs.ClearAll className="clear-all" />
            </li>
            {this.props.lastTenLinks.map((link, index) => {
              return (
                <li key={link.tinyUrl}>
                  <div
                    className='svg-holder'
                    onClick={() => this.props.handleArrow(index)}
                  >
                    <Svgs.Arrow
                      className={link.showTarget ? "arrow-down" : "arrow-left"}
                    />
                  </div>
                  <div className='link-holder'>
                    <a
                      target='_blank'
                      className='tiny-link'
                      href={this.props.createFullLink(link.tinyUrl)}
                    >
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
                  <div
                    className='svg-holder'
                    onClick={() => this.props.copyToClipboard(index)}
                  >
                    {link.isCopied ? (
                      <Svgs.ClipBoardCopied className='copy copy-selected' />
                    ) : (
                      <Svgs.ClipBoard className='copy' />
                    )}
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
