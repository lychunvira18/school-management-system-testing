import React from "react"
import AutoComplete from './AutoComplete'
import {connect} from 'react-redux'

const WeekPicker = ({value, onChange, course, batch, semester, group, subjectInfo}) => {
  let suggestions = []
  try{
    if(Object.keys(subjectInfo).length !==0 && course !== null && batch !== null && semester !== null){
      suggestions = subjectInfo[course][batch][semester][group]['week'].map(e => e.name)
    }
  }catch{}

  return <AutoComplete
          value ={value}
          onChange={onChange}
          label="Week"
          suggestions={suggestions}/>
}
export default connect(state=>({
  subjectInfo: state.initData.subjectInfo,
  batch : state.changePicker.batch,
  course : state.changePicker.course,
  group : state.changePicker.group,
  semester : state.changePicker.semester,
}
  ))(WeekPicker)

