import React from "react";
import { shallow } from "enzyme";
import AttendanceLineTable from "./AttendanceLineTable";

const setUp = (props = {}) => {
  const component = shallow(<AttendanceLineTable {...props} />);
  return component;
};

describe("Attendance Line Table Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    expect(component).toMatchSnapshot();
  });
});
