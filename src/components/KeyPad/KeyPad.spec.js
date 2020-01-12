import React from "react";
import { shallow, mount } from "enzyme";
import KeyPad from "./KeyPad";

describe("KeyPad", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <KeyPad
        handleKeyDown={jest.fn()}
        keyPadOperators={[]}
        keyPadNumbers={[]}
        updateDisplay={jest.fn()}
        setOperator={jest.fn()}
        callOperator={jest.fn()}
      />
    );
  });

  it("Should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render 4 div's", () => {
    expect(wrapper.find("div").length).toEqual(4);
  });
});

describe("Test Numbers and Operators Renderings", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <KeyPad
        handleKeyDown={jest.fn()}
        keyPadOperators={[]}
        keyPadNumbers={[]}
        updateDisplay={jest.fn()}
        setOperator={jest.fn()}
        callOperator={jest.fn()}
      />
    );
  });

  it("Test numbers rendering", () => {
    wrapper.setProps({ keyPadNumbers: ["0", "1", "2", "3"] });
    expect(wrapper.find(".numbers-container").text()).toEqual("0123");
  });

  it("Test operators rendering", () => {
    wrapper.setProps({ keyPadOperators: ["+", "-", "*", "/"] });
    expect(wrapper.find(".operators-container").text()).toEqual("+-*/");
  });
});
