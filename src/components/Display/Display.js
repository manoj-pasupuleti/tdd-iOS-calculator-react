import React from "react";
import PropTypes from "prop-types";

import "./Display.css";

export default function Display({ displayValue }) {
  return (
    <div className="display-container">
      <p className="display-value">{displayValue}</p>
    </div>
  );
}

Display.propTypes = {
  displayValue: PropTypes.string.isRequired
};
