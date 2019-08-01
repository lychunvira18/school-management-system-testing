import React from "react";
import { shallow } from "enzyme";
import SessionTableHead from "./SessionTableHead";
import checkPropTypes from "check-prop-types";

const setUp = (props = {}) => {
  const component = shallow(<SessionTableHead {...props} />);
  return component;
};

const testFunction = () => {
  return 0;
};

describe("GRT Head Component", () => {
  describe("Passing props", () => {
    it("Should not throw a warning!", () => {
      const expectedProps = {
        numSelected: 1,
        onRequestSort: testFunction,
        onSelectAllClick: testFunction,
        order: "Test String",
        orderBy: "Test String",
        rowCount: 1
      };
      const propsErr = checkPropTypes(
        SessionTableHead.propTypes,
        expectedProps,
        "props",
        SessionTableHead.name
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
