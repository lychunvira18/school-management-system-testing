import React, {useEffect} from "react";
import { onSessionChange } from '../../redux/ActionCreator/userBehavior'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import AutoComplete from './AutoComplete'
import {sortSession} from '../../utility-functions'

const SessionPicker = ({dispatch, session, subjectInfo, userTT, course, batch, semester,sessionNumber, group}) => {

    let suggestions = []
    let allSuggestions =  []
    try {
        allSuggestions = subjectInfo[course][batch][semester][group]['session']
        suggestions = Object.keys(userTT['data'][course][batch][semester][group])
    } catch(err){}

    const action = bindActionCreators(onSessionChange, dispatch)

    useEffect(()=>{
        let index = suggestions.findIndex(e => e === allSuggestions[sessionNumber -1])
        action(suggestions[index])
    },[sessionNumber, subjectInfo, userTT])

    return <AutoComplete
            value ={session}
            onChange = {action}
            label = "Session"
            suggestions ={suggestions.sort(sortSession)} />
  }

export default connect(state => ({
    session: state.changePicker.session,
    course: state.changePicker.course,
    batch: state.changePicker.batch,
    semester: state.changePicker.semester,
    group: state.changePicker.group,
    subjectInfo: state.initData.subjectInfo}))(SessionPicker)
