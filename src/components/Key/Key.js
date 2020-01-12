import React from "react";
import PropTypes from "prop-types";

import "./Key.css";

export default function key({ handleKeyDown, keyAction, keyType, keyValue }) {
  const keyClass = `key-container ${keyType}`;
  return (
    <div
      className={keyClass}
      onClick={() => keyAction(keyValue)}
      onKeyPress={handleKeyDown}
      role="button"
      tabIndex="0"
      aria-pressed="false"
      id={`${keyType}-${keyValue}`}
    >
      <p className="key-value">{keyValue}</p>
    </div>
  );
}

key.propTypes = {
  handleKeyDown: PropTypes.func.isRequired,
  keyAction: PropTypes.func.isRequired,
  keyType: PropTypes.string.isRequired,
  keyValue: PropTypes.string.isRequired
};
