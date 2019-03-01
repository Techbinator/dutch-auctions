import React from "react";
import App from "./App";
import { shallow, mount } from "enzyme";

describe("App component", () => {
  it("should render snapshot with default values", () => {
    const wrapper = mount(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
