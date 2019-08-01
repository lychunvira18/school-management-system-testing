import React, {useState, memo, useEffect} from "react";
import { Route, Switch } from "react-router-dom"
import AdminGenerateTimeTable from './Genereate TimeTable/AdminGenerateTimetable'
import FacultyTimeTable from './Faculty TimeTable/FacultyTimetableView'
import StudentTimeTableView from './Student Timetable/StudentTimetableView'
import moment from 'moment'
import {connect} from 'react-redux'
import { onSemesterChange } from '../../redux/ActionCreator/userBehavior'

const AttendanceScreen = props => {

  const { subjectInfo, course, batch, group, userProfile, dispatch } = props;
  const [week, setWeek] = useState(moment.utc().week());
  const [weekStr, setWeekStr] = useState('');
  const [disableCurrentWeek, setDisableCurrentWeek] = useState(false)

  let currentWeek = ''
  let currentSem = ''

  if(Object.keys(subjectInfo).length !== 0 ){
    for(let semester in subjectInfo[course][batch]){
      if(!(group && course && batch)) continue
      for(let week of subjectInfo[course][batch][semester][group]['week']){
        let today = new Date()
        if(today >= new Date(week.startDate) && today <= new Date(week.endDate)){
          currentWeek = week
          currentSem = semester
          break
        }
      }
    }
  }

  const handleChangeWeekStr = value => {
    if (!value) return;
    setWeekStr(value);
  };

  const handleLastWeek = () => {
    let weekInt = parseInt(weekStr.split(" ")[1]) - 1;
    let weekstr = "";
    if (weekInt < 10) weekstr = "W 0" + weekInt;
    else weekstr = "W " + weekInt;
    setWeek(week - 1);
    setWeekStr(weekstr);
  };

  const handleCurrentWeek = () => {
    setWeek(moment(currentWeek.startDate, 'YYYY-MM-DD').week());
    setWeekStr(currentWeek.name)
    dispatch(onSemesterChange(currentSem))
  };

  useEffect(()=>{
    if(currentWeek.name) {
      setWeekStr(currentWeek.name)
      setWeek(moment(currentWeek.startDate, 'YYYY-MM-DD').week())
      dispatch(onSemesterChange(currentSem))
      setDisableCurrentWeek(false)
    }else {
      setDisableCurrentWeek(true)
    }
  }, [currentWeek])

  const handleNextWeek = () => {
    let weekInt = parseInt(weekStr.split(" ")[1]) + 1;
    let weekstr = "";
    if (weekInt < 10) weekstr = "W 0" + weekInt;
    else weekstr = "W " + weekInt;
    setWeekStr(weekstr);
    setWeek(week + 1);
  };

  const route = '/sms/timetable'
  return <>
  {
    !userProfile.role ? null :
    userProfile.role === 'admin' ?
    <Switch>
      <Route path = {`${route}/admin-create`}
        render={routerProps=>{
          return <AdminGenerateTimeTable
                  disableCurrentWeek ={disableCurrentWeek}
                  handleChangeWeekStr={handleChangeWeekStr}
                  handleLastWeek = {handleLastWeek}
                  handleCurrentWeek = {handleCurrentWeek}
                  handleNextWeek = {handleNextWeek}
                  week={week}
                  weekStr={weekStr}
                  {...props}
                  {...routerProps}/>
        }
      }
      />
      <Route path = {`${route}/faculty`}
       render={routerProps=>{
          return <FacultyTimeTable
            handleChangeWeekStr={handleChangeWeekStr}
            handleLastWeek = {handleLastWeek}
            handleCurrentWeek = {handleCurrentWeek}
            handleNextWeek = {handleNextWeek}
            week={week}
            weekStr={weekStr}
            {...props}
            {...routerProps}/>}}/>
      <Route path = {`${route}/student`} component={StudentTimeTableView} />
      <Route
        render={routerProps=>{
          return <AdminGenerateTimeTable
            disableCurrentWeek ={disableCurrentWeek}
            handleChangeWeekStr={handleChangeWeekStr}
            handleLastWeek = {handleLastWeek}
            handleCurrentWeek = {handleCurrentWeek}
            handleNextWeek = {handleNextWeek}
            week={week}
            weekStr={weekStr}
            {...props}
            {...routerProps}/>
        }
         } />
    </Switch>
    : userProfile.role === 'faculty' ?
      <Route
       render={routerProps=>{
          return <FacultyTimeTable
            handleChangeWeekStr={handleChangeWeekStr}
            handleLastWeek = {handleLastWeek}
            handleCurrentWeek = {handleCurrentWeek}
            handleNextWeek = {handleNextWeek}
            week={week}
            weekStr={weekStr}
            {...props}
            {...routerProps}/>}}/> :
      <Route  component={StudentTimeTableView} />
  }
  </>
}
export default connect(state => ({
  subjectInfo: state.initData.subjectInfo,
  userProfile: state.initData.userProfile,
  course: state.changePicker.course,
  batch: state.changePicker.batch,
  semester: state.changePicker.semester,
  group: state.changePicker.group
}))(memo(AttendanceScreen))
