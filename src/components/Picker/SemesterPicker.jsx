import React,{ useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onSemesterChange, onGroupChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'


const SemesterPicker = ({dispatch, semester, subjectInfo, batch, userTT, course, disable=false}) => {

  let actions = bindActionCreators(onSemesterChange, dispatch)

  let semesters = []
  try{
    semesters = Object.keys(subjectInfo[course][batch])
  }catch(err){}

  useEffect(()=> {
    if(!semester) {
      dispatch(onGroupChange(null))
    }
    if(Object.keys(userTT).length) dispatch(actions(userTT['semester']))
  },[userTT])

  return <AutoComplete
          value ={semester}
          onChange ={actions}
          label = "Semester"
          suggestions = {semesters}
          disable = {disable}
        />
}
export default connect(state => ({
  semester:state.changePicker.semester,
  subjectInfo: state.initData.subjectInfo,
  batch : state.changePicker.batch,
  course : state.changePicker.course,
  userTT: state.initData.userTT
}))(SemesterPicker)