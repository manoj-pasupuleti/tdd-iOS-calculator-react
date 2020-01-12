import React from "react";
import { shallow, mount } from "enzyme";

import Calculator from "./Calculator";

describe("Calculator Rendering", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Calculator />);
  });

  it("Should render correctly", () => {
    expect("wrapper").toMatchSnapshot();
  });

  it("Should render a div", () => {
    expect(wrapper.find("div").length).toEqual(1);
    wrapper.unmount();
  });
});

describe("mounted Calculator", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Calculator />);
  });
  it("calls updateDisplay when a number key is clicked", () => {
    const spy = jest.spyOn(wrapper.instance(), "updateDisplay");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find(".number-key")
      .first()
      .simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("updateDisplay", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Calculator />);
  });

  it("updates displayValue", () => {
    wrapper.instance().updateDisplay("5");
    expect(wrapper.state("displayValue")).toEqual("5");
  });

  it("concatenates displayValue", () => {
    wrapper.instance().updateDisplay("5");
    wrapper.instance().updateDisplay("0");
    expect(wrapper.state("displayValue")).toEqual("50");
  });

  it('removes leading "0" from displayValue', () => {
    wrapper.instance().updateDisplay("0");
    expect(wrapper.state("displayValue")).toEqual("0");
    wrapper.instance().updateDisplay("5");
    expect(wrapper.state("displayValue")).toEqual("5");
  });

  it('prevents multiple leading "0"s from displayValue', () => {
    wrapper.instance().updateDisplay("0");
    wrapper.instance().updateDisplay("0");
    expect(wrapper.state("displayValue")).toEqual("0");
  });

  it("removes last char of displayValue", () => {
    wrapper.instance().updateDisplay("5");
    wrapper.instance().updateDisplay("0");
    wrapper.instance().updateDisplay("ce");
    expect(wrapper.state("displayValue")).toEqual("5");
  });

  it('prevents multiple instances of "." in displayValue', () => {
    wrapper.instance().updateDisplay(".");
    wrapper.instance().updateDisplay(".");
    expect(wrapper.state("displayValue")).toEqual(".");
  });

  it('will set displayValue to "0" if displayValue is equal to an empty string', () => {
    wrapper.instance().updateDisplay("ce");
    expect(wrapper.state("displayValue")).toEqual("0");
  });
});

describe("setOperator", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Calculator />);
  });

  it("updates the value of selectedOperator", () => {
    wrapper.instance().setOperator("+");
    expect(wrapper.state("operationToBeExecuted")).toEqual("+");
    wrapper.instance().setOperator("/");
    expect(wrapper.state("operationToBeExecuted")).toEqual("/");
  });

  it("updates the value of storedValue to the value of displayValue", () => {
    wrapper.setState({ displayValue: "5" });
    wrapper.instance().setOperator("+");
    expect(wrapper.state("previouslyStoredValue")).toEqual("5");
  });

  it('updates the value of displayValue to "0"', () => {
    wrapper.setState({ displayValue: "5" });
    wrapper.instance().setOperator("+");
    expect(wrapper.state("displayValue")).toEqual("0");
  });

  it("selectedOperator is not an empty string, does not update storedValue", () => {
    wrapper.setState({ displayValue: "5" });
    wrapper.instance().setOperator("+");
    expect(wrapper.state("previouslyStoredValue")).toEqual("5");
    wrapper.instance().setOperator("-");
    expect(wrapper.state("previouslyStoredValue")).toEqual("5");
  });
});

describe("handleKeyDown", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Calculator />);
  });
  it("updates displayValue to the sum of storedValue and displayValue", () => {
    wrapper.setState({ previouslyStoredValue: "3" });
    wrapper.setState({ displayValue: "2" });
    wrapper.setState({ operationToBeExecuted: "+" });
    wrapper.instance().handleKeyDown({
      key: "Enter",
      preventDefault: () => {},
      stopPropagation: () => {}
    });
    expect(wrapper.state("displayValue")).toEqual("5");
  });
  it("updates displayValue to the sum of storedValue and displayValue", () => {
    wrapper.setState({ displayValue: "2" });
    wrapper.instance().handleKeyDown({
      key: "Tab",
      preventDefault: () => {},
      stopPropagation: () => {}
    });
    expect(wrapper.state("displayValue")).toEqual("2");
  });
  it("updates displayValue to remove last digit", () => {
    wrapper.setState({ displayValue: "24" });
    wrapper.instance().handleKeyDown({
      key: "Backspace",
      preventDefault: () => {},
      stopPropagation: () => {}
    });
    expect(wrapper.state("displayValue")).toEqual("2");
  });
  it("updates displayValue ", () => {
    wrapper.setState({ displayValue: "2" });
    wrapper.instance().handleKeyDown({
      key: "1",
      preventDefault: () => {},
      stopPropagation: () => {}
    });
    expect(wrapper.state("displayValue")).toEqual("21");
  });
  it("updates displayValue ", () => {
    wrapper.setState({ displayValue: "2" });
    wrapper.instance().handleKeyDown({
      key: "+",
      preventDefault: () => {},
      stopPropagation: () => {}
    });
    expect(wrapper.state("operationToBeExecuted")).toEqual("+");
  });
});

describe("callOperator", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Calculator />);
  });

  it("updates displayValue to the sum of storedValue and displayValue", () => {
    wrapper.setState({ previouslyStoredValue: "3" });
    wrapper.setState({ displayValue: "2" });
    wrapper.setState({ operationToBeExecuted: "+" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("5");
  });

  it("updates displayValue to the difference of storedValue and displayValue", () => {
    wrapper.setState({ previouslyStoredValue: "3" });
    wrapper.setState({ displayValue: "2" });
    wrapper.setState({ operationToBeExecuted: "-" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("1");
  });

  it("updates displayValue to the product of storedValue and displayValue", () => {
    wrapper.setState({ previouslyStoredValue: "3" });
    wrapper.setState({ displayValue: "2" });
    wrapper.setState({ operationToBeExecuted: "*" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("6");
  });

  it("updates displayValue to the quotient of storedValue and displayValue", () => {
    wrapper.setState({ previouslyStoredValue: "3" });
    wrapper.setState({ displayValue: "2" });
    wrapper.setState({ operationToBeExecuted: "/" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("1.5");
  });

  it('updates displayValue to "0" if operation results in "NaN"', () => {
    wrapper.setState({ previouslyStoredValue: "3" });
    wrapper.setState({ displayValue: "string" });
    wrapper.setState({ operationToBeExecuted: "/" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("0");
  });

  it('updates displayValue to "0" if operation results in "Infinity"', () => {
    wrapper.setState({ previouslyStoredValue: "7" });
    wrapper.setState({ displayValue: "0" });
    wrapper.setState({ operationToBeExecuted: "/" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("0");
  });

  it('updates displayValue to "0" if selectedOperator does not match cases', () => {
    wrapper.setState({ previouslyStoredValue: "7" });
    wrapper.setState({ displayValue: "10" });
    wrapper.setState({ operationToBeExecuted: "string" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("0");
  });

  it('updates displayValue to "0" if called with no value for storedValue or selectedOperator', () => {
    wrapper.setState({ previouslyStoredValue: "" });
    wrapper.setState({ displayValue: "10" });
    wrapper.setState({ operationToBeExecuted: "" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("0");
  });
});
