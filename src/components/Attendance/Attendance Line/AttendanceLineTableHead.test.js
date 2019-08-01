import React from "react";
import { shallow } from "enzyme";
import AttendanceLineTableHead from "./AttendanceLineTableHead";
import checkPropTypes from "check-prop-types";

const setUp = (props = {}) => {
  const component = shallow(<AttendanceLineTableHead {...props} />);
  return component;
};

describe("ALT Head Component", () => {
  describe("Passing props", () => {
    it("Should not throw a warning!", () => {
      const expectedProps = {
        onRequestSort: undefined,
        order: "Test String",
        orderBy: "Test String"
      };
      const propsErr = checkPropTypes(
        AttendanceLineTableHead.propTypes,
        expectedProps,
        "props",
        AttendanceLineTableHead.name
      );
      expect(propsErr).toBeUndefined();
    });
  });
  describe("Rendering", () => {
    let component;
    beforeEach(() => {
      component = setUp();
    });

    it("Should render without errors", () => {
      expect(component).toMatchSnapshot();
    });
  });
});
