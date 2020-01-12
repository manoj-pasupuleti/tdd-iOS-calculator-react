/* eslint-disable react/state-in-constructor */
import React, { Component } from "react";

import Display from "../Display/Display";
import KeyPad from "../KeyPad/KeyPad";
import "./Calculator.css";

export default class Calculator extends Component {
  state = {
    displayValue: "0",
    keyPadNumbers: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      ".",
      "ce"
    ],
    keyPadOperators: ["/", "*", "-", "+"],
    operationToBeExecuted: "",
    previouslyStoredValue: ""
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleKeyDown);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleKeyDown);
  };

  handleKeyDown = e => {
    const { keyPadNumbers, keyPadOperators } = this.state;
    const { key } = e;
    // to support keyboard navigation using Tab or Shift+Tab
    if (key !== "Tab") {
      e.preventDefault();
      e.stopPropagation();
    }
    if (key === "Backspace") this.updateDisplay("ce");
    if (key === "Enter" || key === "=") this.callOperator();

    if (keyPadNumbers.indexOf(key) > -1) {
      this.updateDisplay(key);
    } else if (keyPadOperators.indexOf(key) > -1) {
      this.setOperator(key);
    }
  };

  setOperator = value => {
    let {
      displayValue,
      operationToBeExecuted,
      previouslyStoredValue
    } = this.state;

    if (operationToBeExecuted === "") {
      previouslyStoredValue = displayValue;
      displayValue = "0";
      operationToBeExecuted = value;
    } else {
      operationToBeExecuted = value;
    }
    this.setState({
      displayValue,
      operationToBeExecuted,
      previouslyStoredValue
    });
  };

  updateDisplay = value => {
    let { displayValue } = this.state;
    let valueCopy = value;

    if (valueCopy === "." && displayValue.includes(".")) valueCopy = "";

    if (valueCopy === "ce") {
      displayValue = displayValue.substr(0, displayValue.length - 1);
      if (displayValue === "") displayValue = "0";
    } else if (displayValue === "0") {
      displayValue = valueCopy;
    } else {
      displayValue += valueCopy;
    }
    this.setState({ displayValue });
  };

  callOperator = () => {
    let {
      operationToBeExecuted,
      displayValue,
      previouslyStoredValue
    } = this.state;
    const updatedStoredValue = displayValue;

    displayValue = parseInt(displayValue, 10);
    previouslyStoredValue = parseInt(previouslyStoredValue, 10);

    switch (operationToBeExecuted) {
      case "+":
        displayValue += previouslyStoredValue;
        break;
      case "-":
        displayValue = previouslyStoredValue - displayValue;
        break;
      case "*":
        displayValue *= previouslyStoredValue;
        break;
      case "/":
        displayValue = previouslyStoredValue / displayValue;
        break;
      default:
        displayValue = 0;
    }

    displayValue = displayValue.toString();
    operationToBeExecuted = "";
    if (displayValue === "NaN" || displayValue === "Infinity") {
      displayValue = "0";
    }
    this.setState({
      displayValue,
      operationToBeExecuted,
      previouslyStoredValue: updatedStoredValue
    });
  };

  render() {
    const { displayValue, keyPadNumbers, keyPadOperators } = this.state;
    return (
      <div className="calculator-container">
        <Display displayValue={displayValue} />
        <KeyPad
          handleKeyDown={this.handleKeyDown}
          keyPadOperators={keyPadOperators}
          keyPadNumbers={keyPadNumbers}
          callOperator={this.callOperator}
          setOperator={this.setOperator}
          updateDisplay={this.updateDisplay}
        />
      </div>
    );
  }
}
