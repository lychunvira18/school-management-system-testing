import React from "react";
import { shallow } from "enzyme";
import GenerateReportHeadPicker from "./GenerateReportHeadPicker";

const setUp = (props = {}) => {
  const component = shallow(<GenerateReportHeadPicker {...props} />);
  return component;
};

describe("GR Head Picker Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = component.find(`[data-test='GRHPWrapper']`);
    expect(wrapper.length).toBe(1);
  });

  it("Grid Container should render", () => {
    const wrapper = component.find(`[data-test='GridContainer']`);
    expect(wrapper.length).toBe(1);
  });

  it("Grid Item Container should render", () => {
    const wrapper = component.find(`[data-test='GridItemContainer']`);
    expect(wrapper.length).toBe(1);
  });

  it("Grids should render", () => {
    const wrapper = component.find(`[data-test='Grid']`);
    expect(wrapper.length).toBe(6);
  });
});
