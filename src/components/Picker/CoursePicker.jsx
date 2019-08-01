import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { onCourseChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'

const CoursePicker = ({course, subjectInfo, userTT, userProfile, dispatch}) => {
  let data = {}
  if(userProfile.role === 'admin'){
    data = subjectInfo
  }else {
    data = userTT['data']
  }
  let actions = bindActionCreators({onCourseChange}, dispatch)
  console.log('data',data);
  return <AutoComplete
          value={course}
          onChange={actions.onCourseChange}
          label = "Course"
          suggestions={data ? Object.keys(data): []} />
}
export default connect(state => ({
  course : state.changePicker.course,
  subjectInfo: state.initData.subjectInfo,
  userProfile: state.initData.userProfile
}))(CoursePicker)
