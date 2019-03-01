import React from "react";
import Button from "./Button";
import { shallow } from "enzyme";

describe("Button component", () => {
  it("should render snapshot with default values", () => {
    const wrapper = shallow(<Button text="test" type="primary" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render disabled button with default values", () => {
    const wrapper = shallow(
      <Button disabled text="secondary" type="secondary" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
