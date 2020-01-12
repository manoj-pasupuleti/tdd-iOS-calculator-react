import React from "react";
import { shallow } from "enzyme";
import Display from "./Display";
import { exportAllDeclaration } from "@babel/types";

const TEST_DISPLAY_VALUE = "Testing123";

describe("Display", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Display displayValue={TEST_DISPLAY_VALUE} />);
  });

  it("Should Render Correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Renders display value correctly", () => {
    expect(wrapper.text()).toEqual(TEST_DISPLAY_VALUE);
  });
});
