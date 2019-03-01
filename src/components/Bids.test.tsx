import React from "react";
import Bids from "./Bids";
import { render } from "enzyme";

import bidsMock from "../helpers/__mocks__/bids.json";
import { IBid } from "../types/auction.type";

describe("Bids component", () => {
  it("should render snapshot with default values", () => {
    const wrapper = render(<Bids bids={bidsMock as IBid[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
