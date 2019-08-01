import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onFacultyChange } from "../../redux/ActionCreator/userBehavior";
import AutoComplete from "./AutoComplete";

const FacultyPicker = ({
  dispatch,
  faculty,
  course,
  batch,
  semester,
  group,
  session,
  userTT,
  userProfile
}) => {
  let actions = bindActionCreators(onFacultyChange, dispatch);
  let suggestions = [];
  let temp = {};
  if (userProfile.role === "admin") {
    try {
      temp = userTT['data'][course][batch][semester][group];
      for (let e in temp) {
        if (temp[e]["faculty"] && !suggestions.includes(temp[e]["faculty"])) {
          suggestions.push(temp[e]["faculty"]);
        }
      }
    } catch (e) {}
  } else {
    suggestions.push(userProfile.name)
    faculty = userProfile.name
  }

  useEffect(() => {
    for (let i in temp) {
      if (i === session) {
        actions(temp[i]["faculty"]);
        break;
      }
    }
  }, [session, userTT]);
  return (
    <AutoComplete
      value={faculty}
      onChange={actions.onFacultyChange}
      label="Faculty"
      suggestions={suggestions}
      disable
    />
  );
};
export default connect(state => ({
  faculty: state.changePicker.faculty,
  session: state.changePicker.session,
  course: state.changePicker.course,
  batch: state.changePicker.batch,
  group: state.changePicker.group,
  semester: state.changePicker.semester,
  userProfile: state.initData.userProfile
}))(FacultyPicker);
