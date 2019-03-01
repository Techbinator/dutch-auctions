import React from "react";
import Navigation from "./Navigation";
import { shallow } from "enzyme";

const onLogoutClick = jest.fn();
describe("Navigation component", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(
      <Navigation isLogedIn showMenu onLogOutClick={onLogoutClick} />
    );
  });
  it("should render snapshot with loged in urls in header", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render snapshot with loged out urls in header", () => {
    const onLogoutClick = jest.fn();
    const wrapper = shallow(
      <Navigation showMenu={false} onLogOutClick={onLogoutClick} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should call log out function on link click", () => {
    wrapper.find(".logout").simulate("click");
    expect(onLogoutClick).toBeCalled();
  });
});
