import React, {useEffect} from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onGroupChange } from '../../redux/ActionCreator/userBehavior'
import AutoComplete from './AutoComplete'

const GroupPicker = ({dispatch, group, batch, course, subjectInfo, userTT, semester, userProfile}) => {
  let actions = bindActionCreators(onGroupChange, dispatch)
  let data = []
  try{
    if(userProfile.role !== 'admin'){
      data = Object.keys(userTT['data'][course][batch][semester].filter(e=>e.includes('Group')))
    }else{
      data = Object.keys(subjectInfo[course][batch][semester]).filter(e=>e.includes('Group'))
    }
  }catch{}

  useEffect(()=>{
    if(!group) actions('Group 1')
  }, [semester])

  return <AutoComplete
          value ={group}
          onChange ={actions}
          label = "Group"
          suggestions = {data}
        />
}
export default connect(state => ({
  group:state.changePicker.group,
  batch : state.changePicker.batch,
  course : state.changePicker.course,
  semester : state.changePicker.semester,
  subjectInfo : state.initData.subjectInfo,
  userProfile : state.initData.userProfile,
}))(GroupPicker)