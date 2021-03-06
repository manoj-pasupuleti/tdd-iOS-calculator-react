import React from "react";
import PropTypes from "prop-types";

import "./KeyPad.css";
import Key from "../Key/Key";

export default function KeyPad({
  handleKeyDown,
  keyPadOperators,
  keyPadNumbers,
  updateDisplay,
  setOperator,
  callOperator
}) {
  const renderNumbers = () =>
    keyPadNumbers &&
    keyPadNumbers.map(number => (
      <Key
        handleKeyDown={handleKeyDown}
        key={number}
        keyValue={number}
        keyType="number-key"
        keyAction={updateDisplay}
      />
    ));

  const renderOperators = () =>
    keyPadOperators &&
    keyPadOperators.map(operator => (
      <Key
        handleKeyDown={handleKeyDown}
        key={operator}
        keyValue={operator}
        keyType="operator-key"
        keyAction={setOperator}
      />
    ));

  return (
    <div className="keypad-container">
      <div className="numbers-container">{renderNumbers()}</div>
      <div className="operators-container">{renderOperators()}</div>
      <div className="submit-container">
        <Key
          handleKeyDown={handleKeyDown}
          keyType="submit-key"
          keyValue="="
          keyAction={callOperator}
        />
      </div>
    </div>
  );
}

KeyPad.propTypes = {
  handleKeyDown: PropTypes.func.isRequired,
  keyPadOperators: PropTypes.arrayOf(PropTypes.string).isRequired,
  keyPadNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateDisplay: PropTypes.func.isRequired,
  setOperator: PropTypes.func.isRequired,
  callOperator: PropTypes.func.isRequired
};
