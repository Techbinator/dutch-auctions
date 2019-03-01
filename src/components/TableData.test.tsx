import React from "react";
import TableData from "./TableData";
import { shallow } from "enzyme";

describe("TableData component", () => {
  it("should render snapshot with default values", () => {
    const tableData = shallow(
      <TableData title="Test title" value="Test value" />
    );
    expect(tableData).toMatchSnapshot();
  });
});
