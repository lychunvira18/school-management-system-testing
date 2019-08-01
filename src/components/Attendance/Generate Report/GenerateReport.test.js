import React from "react";
import { shallow } from "enzyme";
import GenerateReport from "./GenerateReport";

const setUp = (props = {}) => {
  const component = shallow(<GenerateReport {...props} />);
  return component;
};

describe("GR Rendering", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    expect(component).toMatchSnapshot();
  });
});
