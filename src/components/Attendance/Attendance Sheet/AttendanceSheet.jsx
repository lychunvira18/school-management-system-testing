import React, { useState, useEffect } from "react";
import { AppBar, Tabs, Tab, withStyles, Typography, Box } from "@material-ui/core";
import HeadPicker from "./HeadPicker";
import SessionTable from "./SessionTable";
import { connect } from "react-redux";
import { requestUserTimetable } from "../../../redux/ActionCreator/apiRequest";
import moment from 'moment'
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

const styles = theme => ({
  root:{
  flexGrow: 1,
  width: "100%"
  },
  format: {
        backgroundColor: '#efefef',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        maxWidth: 1400,
  }
});

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    treshold: 0,
    target: window ? window() : undefined
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}
const AttendancesSheet = (props) => {

  const {classes, dispatch, date, course, batch, group, faculty, semester, session, subjectInfo, userTT} = props

  let availableTab = [];
  let allSessions = [];
  try {
    if (Object.keys(subjectInfo).length !== 0) {
      allSessions = subjectInfo[course][batch][semester][group]["session"];
      let availableSession = Object.keys(
        userTT['data'][course][batch][semester][group]
      );
      allSessions.forEach((e, i) => {
        if (availableSession.includes(e)) {
          availableTab.push(i + 1);
        }
      });
    }
  } catch {}

  useEffect(()=>{
    if(date == 'Invalid Date') return
    if(!date) return
    if(date > new Date()) return
    dispatch(requestUserTimetable({date:moment(date).format('YYYY-MM-DD'), course, batch, group, semester}))
  }, [date, faculty, course, batch, group, semester])

  const [sessionNumber, setSessionNumber] = useState(1);

  useEffect(() => {
    if (Object.keys(subjectInfo).length !== 0) {
      if (!session) return;
      setSessionNumber(
        subjectInfo[course][batch][semester][group]["session"].findIndex(
          e => e === session
        ) + 1
      );
    }
  }, [session]);

  const handleChangeSessionNumber = (event, sessionNumber) => {
    setSessionNumber(sessionNumber);
  };

  return (
    <div className={classes.format}>
      <div style={{width:400, margin:'auto', marginBottom:10, marginTop:10}}><Typography variant='h4'><b>Attendance Sheet</b></Typography></div>
      <ElevationScroll {...props}>
        <AppBar position="sticky" color="default" >
          <Box boxShadow={3}>
            <Tabs
              value={sessionNumber}
              onChange={handleChangeSessionNumber}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="on"
            >
              {availableTab.map(i => (
                <Tab label={"session " + i} key={i} value={i} />
              ))}
            </Tabs>
          </Box>
        </AppBar>
      </ElevationScroll>

      <HeadPicker sessionNumber={sessionNumber} userTT={userTT} />
      <SessionTable sessions={availableTab} sessionNumber={sessionNumber} />
    </div>
  );
};

export default connect(state => ({
  studentData: state.studentData,
  date: state.changePicker.date,
  session: state.changePicker.session,
  course: state.changePicker.course,
  batch: state.changePicker.batch,
  group: state.changePicker.group,
  faculty: state.changePicker.faculty,
  semester: state.changePicker.semester,
  subjectInfo: state.initData.subjectInfo,
  userTT: state.initData.userTT
}))(withStyles(styles)(AttendancesSheet));
