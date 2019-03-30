import React, { Component } from "react";
import Svgs from "../Svgs/Svgs";
import PropTypes from "prop-types";
import ListItem from "./ListItem/ListItem";
import Modal from "../Modal/Modal";

export default class List extends Component {
  state = {
    showModal: false
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    let isAllCollapsed = this.props.lastTenLinks.every(
      link => link.showTarget === true
    );
    return (
      <React.Fragment>
        {this.state.showModal ? (
          <Modal
            toggleModal={this.toggleModal}
            deleteAll={this.props.deleteAll}
            deletionMessage={this.props.deletionMessage}
          />
        ) : null}

        <main>
          <h2>Your 10 last created links</h2>

          <div className="link-list-holder">
            <ol>
              <li>
                <Svgs.ArrowWithLine
                  className={isAllCollapsed ? "arrow-line open" : "arrow-line"}
                  onClick={() => this.props.handleArrow("all")}
                />
                <h4>Tiny Link:</h4>
                <Svgs.ClearAll
                  className="clear-all"
                  onClick={this.toggleModal}
                />
              </li>
              {this.props.lastTenLinks.map((link, index) => {
                return (
                  <ListItem
                    key={link.tinyUrl}
                    link={link}
                    index={index}
                    copyToClipboard={this.props.copyToClipboard}
                    handleArrow={this.props.handleArrow}
                    createFullLink={this.props.createFullLink}
                  />
                );
              })}
            </ol>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

List.propTypes = {
  lastTenLinks: PropTypes.array,
  handleArrow: PropTypes.func,
  createFullLink: PropTypes.func,
  copyToClipboard: PropTypes.func,
  deletionMessage: PropTypes.string
};
