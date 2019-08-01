import React from "react";
import { shallow } from "enzyme";
import GenerateReportTable from "./GenerateReportTable";

const setUp = (props = {}) => {
  const component = shallow(<GenerateReportTable {...props} />);
  return component;
};

describe("GRT Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    expect(component).toMatchSnapshot();
  });
});
