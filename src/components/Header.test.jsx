import React from "react";
import WrappedHeader, { Header } from "./Header";
import { render, shallow } from "enzyme";
import { MemoryRouter } from "react-router";

describe("Header component", () => {
  it("should render snapshot with default values", () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/random"]}>
        <WrappedHeader />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should change the menu state on button click", () => {
    const historyMock = { push: jest.fn() };
    const wrapper = shallow(<Header isLogedIn={false} history={historyMock} />);

    wrapper.find(".navbar-toggle").simulate("click");
    expect(wrapper.state()).toHaveProperty("showMenu", true);
  });
});
