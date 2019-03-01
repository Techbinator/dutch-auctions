import React from "react";
import { shallow } from "enzyme";
import NewAuction from "./NewAuction";
import authUser from "../helpers/__mocks__/authUser.json";
import { User } from "firebase";
import { db } from "../firebase";

describe("Loading component", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<NewAuction authUser={authUser as User} />);
  });

  it("should render snapshot with default values", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should modify state depending on the values selected", () => {
    const titleInput = wrapper.find('input[name="title"]');
    const startingBidInput = wrapper.find('input[name="startingBid"]');

    titleInput.simulate("change", {
      target: { value: "Title value", name: "title" }
    });
    expect(wrapper.state("title")).toBe("Title value");

    startingBidInput.simulate("change", {
      target: { value: "string", name: "startingBid" }
    });
    expect(wrapper.state("startingBid")).toBe(NaN);

    startingBidInput.simulate("change", {
      target: { value: 22, name: "startingBid" }
    });
    expect(wrapper.state("startingBid")).toBe(22);
  });

  it("should submit correct values to firestore", () => {
    const titleInput = wrapper.find('input[name="title"]');
    const startingBidInput = wrapper.find('input[name="startingBid"]');
    const addMock = jest.spyOn(db, "createNewAuction");
    const event = {
      preventDefault: jest.fn()
    } as any;

    titleInput.simulate("change", {
      target: { value: "Title value", name: "title" }
    });

    startingBidInput.simulate("change", {
      target: { value: 22, name: "startingBid" }
    });

    wrapper.instance().onSubmit(event);
    expect(addMock).toBeCalledWith({
      ownerEmail: "dummyemail",
      ownerId: "dummyuuid",
      startingBid: 22,
      title: "Title value"
    });
  });
});
