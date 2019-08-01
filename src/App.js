import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import './index.css'
import AttendancesScreen from './components/Attendance/AttendancesScreen'
import TimeTable from './components/Timetable/TimeTable'
import { Route, Switch, Router } from "react-router-dom"
import * as serviceWorker from './serviceWorker'
import { createBrowserHistory } from 'history'
import NavigationBar from "./components/NavigationBar/Navigator"
import { ThemeProvider } from '@material-ui/styles';
import {theme} from '../src/constants/color'
import {getSubjectData, getUid} from './redux/ActionCreator/apiRequest'
import ProtectedRoute from './components/ProtectedRoute'
const hist = createBrowserHistory()

const App = ({dispatch}) => {
  useEffect(() => {
    dispatch(getUid())
    dispatch(getSubjectData())
  }, [])
   return <>
    <ThemeProvider theme={theme}>
        <Router history={hist}>
          <Route path='/' component={NavigationBar} />
          <Switch>
            <ProtectedRoute path = '/sms/attendances' component={AttendancesScreen} route ='attendance'/>
            <Route path='/sms/timetable' component={TimeTable}/>
            {/*<Route path='/timetables/timetable_report' component={TimetableReport}/>*/}
            <ProtectedRoute component={AttendancesScreen} route ='attendance'/>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
}
export default connect()(App)
serviceWorker.register();