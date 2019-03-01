import React from "react";
import Loading from "./Loading";
import { shallow } from "enzyme";

describe("Loading component", () => {
  it("should render snapshot with default values", () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toMatchSnapshot();
  });
});
