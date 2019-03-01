import React from "react";
import SubmitBid from "./SubmitBid";
import { shallow } from "enzyme";

import { db } from "../firebase";
var auctions = require("../helpers/__mocks__/auctions.json");
const auction = auctions[0];

const event = {
  preventDefault: jest.fn()
} as any;

describe("SubmitBid component", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(
      <SubmitBid
        userId="useridtest"
        userEmail="useremailtest"
        auction={auction}
        auctionEnded={false}
      />
    );
  });
  it("should render snapshot with default values", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should return that the owner and current user are different", () => {
    expect(wrapper.instance().isSameUser()).toBeFalsy();
  });

  it("should trigger bid submit with the right parameters", () => {
    const submitBidSpy = jest.spyOn(db, "submitBid");
    const startingBidInput = wrapper.find('input[name="amount"]');

    startingBidInput.simulate("change", {
      target: { value: 33, name: "amount" }
    });
    expect(wrapper.state("amount")).toBe(33);

    wrapper.instance().onSubmit(event);
    expect(submitBidSpy).toBeCalledWith({
      amount: 33,
      auctionId: "37gc2mvSPYSXfSqTNlE34qL8Qusssse2",
      userEmail: "useremailtest",
      userId: "useridtest"
    });
  });
});
