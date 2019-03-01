import React from "react";
import MainContainer from "./MainContainer";
import { shallow } from "enzyme";

describe("MainContainer component", () => {
  it("should render snapshot with default values", () => {
    const wrapper = shallow(
      <MainContainer isLogedIn={true}>
        <div>children</div>
      </MainContainer>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
