import "date-fns";
import React from "react";
import { connect } from "react-redux";
import { onDateChange } from "../../redux/ActionCreator/userBehavior";
import DefaultDatePicker from "./DefaultDatePicker";

const AttendanceDate = ({ date, onChangeDate, dispatch }) => {
  const handleChangeDate = date => {
    if (date == "Invalid Date") return;
    dispatch(onDateChange(date));
  };
  return (
    <DefaultDatePicker
      width={280}
      value={date}
      onChange={handleChangeDate}
      label="Date"
    />
  );
};
export default connect(state => ({ date: state.changePicker.date }))(AttendanceDate)
