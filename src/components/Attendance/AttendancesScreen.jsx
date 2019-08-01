import React from "react";
import AttendancesSheet from './Attendance Sheet/AttendanceSheet'
import AttendanceLine from './Attendance Line/AttendanceLine'
import GenerateReport from './Generate Report/GenerateReport'
import { Route, Switch } from "react-router-dom"

const AttendanceScreen = () => {

  let route = '/sms/attendance'
  return <Switch>
      <Route path = {`${route}/attendance_line`} component={AttendanceLine} />
      <Route path = {`${route}/generate_report`} component={GenerateReport} />
      <Route path = {`${route}/attendance_sheet`} component={AttendancesSheet} />
      <Route  component={AttendancesSheet} />
  </Switch>
}
export default AttendanceScreen
