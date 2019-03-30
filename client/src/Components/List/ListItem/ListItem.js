import React from "react";
import PropTypes from "prop-types";
import Svgs from "../../Svgs/Svgs";

const ListItem = props => {
  const { handleArrow, createFullLink, copyToClipboard, index } = props;
  const { tinyUrl, showTarget, webUrl, isCopied } = props.link;

  return (
    <li>
      <div className="svg-holder" onClick={() => handleArrow(index)}>
        <Svgs.Arrow className={showTarget ? "arrow-down" : "arrow-left"} />
      </div>
      <div className="link-holder">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="tiny-link"
          href={createFullLink(tinyUrl)}
        >
          {createFullLink(tinyUrl)}
        </a>

        <div className={showTarget ? "web-link" : "web-link collapsed"}>
          <h4>=</h4>
          <a target="_blank" rel="noopener noreferrer" href={webUrl}>
            {webUrl}
          </a>
        </div>
      </div>
      <div className="svg-holder" onClick={() => copyToClipboard(index)}>
        {isCopied ? (
          <Svgs.ClipBoardCopied className="copy copy-selected" />
        ) : (
          <Svgs.ClipBoard className="copy" />
        )}
      </div>
    </li>
  );
};

export default ListItem;

ListItem.propTypes = {
  copyToClipboard: PropTypes.func,
  handleArrow: PropTypes.func,
  createFullLink: PropTypes.func,
  link: PropTypes.object,
  index: PropTypes.number
};
