import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow } from "@material-ui/core";
import DisplayTimetableHeader from "../DisplayTimetableHeader";
import FacultyDateNavigator from "../FacultyDateNavigator";
import { requestStudentTimeTable } from "../../../redux/ActionCreator/apiRequest";
import { connect } from "react-redux";
import moment from "moment";
import CustomTableCell from "../../Table/CustomTableCell";
import tableStyle from "../../Table/TableStyle";
import SearchBox from './SearchBox'
import {onCourseChange, onBatchChange, onGroupChange, onSemesterChange} from '../../../redux/ActionCreator/userBehavior'
import {sortSession} from '../../../utility-functions'


const StudentView = ({dispatch, studentTT, subjectInfo, semester}) => {

  let currentWeekIndex = -1

  const [weekIndex, setWeekIndex] = useState(-1)
  const [weekName, changeWeekName] = useState('W 01')

  let weekNameStr = weekName

  const handleLastWeek = () => {
    let weekInt = parseInt(weekNameStr.split(" ")[1]) - 1;
    let weekName = "";
    if (weekInt < 10) weekName = "W 0" + weekInt;
    else weekName = "W " + weekInt;
    setWeekIndex(weekIndex - 1);
    changeWeekName(weekName)
  };

  const handleCurrentWeek = () => {
    setWeekIndex(currentWeekIndex);
  };

  const handleNextWeek = () => {
    let weekInt = parseInt(weekNameStr.split(" ")[1]) + 1;
    let weekName = "";
    if (weekInt < 10) weekName = "W 0" + weekInt;
    else weekName = "W " + weekInt;
    setWeekIndex(weekIndex + 1);
    changeWeekName(weekName)
  };

  const handleChangeWeekName = (value) => {
    changeWeekName(value)
    const {course, batch, group} = studentTT.header
    let weeks = subjectInfo[course][batch][semester][group]['week']
    const weekIndex = weeks.findIndex(e => e.name === value)
    setWeekIndex(weekIndex)
  }

  var weeks = []
  if(studentTT.header !== undefined && Object.keys(subjectInfo).length !== 0){
    const {course, batch, group} = studentTT.header
    try{
      weeks = subjectInfo[course][batch][semester][group]['week']
    }catch{}
  }

  useEffect(()=> {
    if(weekIndex === -1){
      if(studentTT.header !== undefined && Object.keys(subjectInfo).length !== 0){
        const {course, batch,semester, group} = studentTT.header
        let weeks = subjectInfo[course][batch][semester][group]['week']
        currentWeekIndex = weeks.findIndex(e => moment() >= moment(e.startDate, 'YYYY-MM-DD') && moment() <= moment(e.endDate, 'YYYY-MM-DD'))
        changeWeekName(weeks[currentWeekIndex].name)
        dispatch(onBatchChange(batch))
        dispatch(onCourseChange(course))
        dispatch(onGroupChange(group))
        dispatch(onSemesterChange(semester))
        setWeekIndex(currentWeekIndex)
      }
    }
  }, [subjectInfo, studentTT, semester])


  useEffect(()=>{
    if(weeks.length !== 0 && weekIndex !== -1)
      dispatch(requestStudentTimeTable({week: weeks[weekIndex].id, semester, date:moment().utc().format('YYYY-MM-DD')}))
    else  dispatch(requestStudentTimeTable({week: false, date:moment().utc().format('YYYY-MM-DD')}))
  }, [weekIndex, semester])

  const header = ["Session"];

  if(weeks.length !== 0 && weekIndex !== -1){
    for (let i = 0; i < 7; i++) {
      header.push(
        moment(weeks[weekIndex].startDate, 'YYYY-MM-DD')
        .add(i, 'days')
        .utc()
        .format("ddd MM/DD")
      );
    }
  }

  const classes = tableStyle();

  return (
    <div className={classes.format}>
      <SearchBox value={weekName} onChange={handleChangeWeekName}/>
      <FacultyDateNavigator
        week={weeks.length !== 0 && weekIndex !== -1 ? moment(weeks[weekIndex].startDate, 'YYYY-MM-DD'): moment()}
        weekEnd = {weeks.length !== 0 ? weeks[weeks.length-1].name: ''}
        weekStr={weekName}
        handleLastWeek={handleLastWeek}
        handleNextWeek={handleNextWeek}
        handleCurrentWeek={handleCurrentWeek}/>
      <DisplayTimetableHeader
        header={studentTT["header"]}
        week={
          Object.keys(studentTT).length !== 0
            ? studentTT["header"]["week"]
            : null
        }
      />

      <div className={classes.container}>
        <Paper className={classes.subRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.row}>
                {header.map(item => (
                  <CustomTableCell align="center" multiline={"true"} key={item}>
                    {item}
                  </CustomTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(studentTT).sort(sortSession).map(session => {
                if (session === "header") return null;
                const temp = [];
                for (let i = 0; i < 7; i++) {
                  temp.push(
                    <CustomTableCell align="center" key={i}>
                      {i + 1 in studentTT[session]
                        ? studentTT[session][i + 1]
                        : null}
                    </CustomTableCell>
                  );
                }
                return (
                  <TableRow className={classes.row} key={session}>
                    <CustomTableCell align="center">{session}</CustomTableCell>
                    {temp}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
  </div>
  );
};

export default connect(state => ({
  studentTT: state.initData.studentTT,
  subjectInfo: state.initData.subjectInfo,
  semester: state.changePicker.semester
}))(StudentView);
