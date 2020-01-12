import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Calculator from "../Calculator/Calculator";
import { isTSAnyKeyword } from "@babel/types";

describe("App", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("Should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render 1 div", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });
  it("should render the Calculator Component", () => {
    expect(wrapper.containsMatchingElement(<Calculator />)).toEqual(true);
  });
});
