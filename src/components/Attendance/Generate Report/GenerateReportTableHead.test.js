import React from "react";
import { shallow } from "enzyme";
import GenerateReportTableHead from "./GenerateReportTableHead";
import checkPropTypes from "check-prop-types";

const setUp = (props = {}) => {
  const component = shallow(<GenerateReportTableHead {...props} />);
  return component;
};

describe("GRT Head Component", () => {
  describe("Passing props", () => {
    it("Should not throw a warning!", () => {
      const expectedProps = {
        onRequestSort: undefined,
        order: "Test String",
        orderBy: "Test String"
      };
      const propsErr = checkPropTypes(
        GenerateReportTableHead.propTypes,
        expectedProps,
        "props",
        GenerateReportTableHead.name
      );
      expect(propsErr).toBe(undefined);
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
