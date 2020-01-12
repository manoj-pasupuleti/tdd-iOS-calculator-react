import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import Key from "./Key";

describe("Key", () => {
  let wrapper;
  const onClick = sinon.spy();
  beforeEach(() => {
    wrapper = shallow(
      <Key
        handleKeyDown={jest.fn()}
        keyAction={onClick}
        keyType="number-key"
        keyValue="0"
      />
    );
  });

  it("Should Render Correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should Render key Value Correctly", () => {
    expect(wrapper.text()).toEqual("0");
  });

  it("Simulate click action", () => {
    wrapper.find("div").simulate("click");
    expect(onClick.callCount).toEqual(1);
  });
});
