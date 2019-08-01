import React from "react";
import { shallow } from "enzyme";
import AttendanceLine from "./AttendanceLine";

const setUp = (props = {}) => {
  const component = shallow(<AttendanceLine {...props} />);
  return component;
};

describe("Attendance Line Rendering", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    expect(component).toMatchSnapshot();
  });
});
