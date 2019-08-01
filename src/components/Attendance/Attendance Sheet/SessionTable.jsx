import React, { Component } from "react"
import PropTypes from "prop-types"
import {requestStudent, createAttendanceSheet} from '../../../redux/ActionCreator/apiRequest'
import {onRemarkChange} from '../../../redux/ActionCreator/userBehavior'
import {
  TableBody,
  TableRow,
  TableCell,
  Table,
  Checkbox,
  withStyles,
  Typography,
  InputBase,
  Box,
} from "@material-ui/core"
import SessionTableHead from "./SessionTableHead"
import SessionTableToolBar from "./SessionTableToolBar"
import AttendanceButton from "../../Button/AttendanceButton"
import { connect } from 'react-redux'
import { store } from '../../../redux/store'
import OdooServerStatusDialog from '../../Alert/OdooServerStatusDialog'
import { Prompt } from 'react-router-dom'
import moment from 'moment'
import DefaultAlert from '../../Alert/DefaultDialog'
import Report from "@material-ui/icons/Report";


const styles = theme => ({
  root: {
    witdth: "100%",
    marginTop: theme.spacing(3),
  },
  table: {
    minWroll_numberth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },

  textRow: {
    fontSize: 13
  }
});

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const mapStateToProps = (state) => {
  return {
    studentData : state.initData.studentData ,
    isPending: state.initData.isPending,
    subjectInfo: state.initData.subjectInfo,
    error: state.initData.error,
    batch: state.changePicker.batch,
    group: state.changePicker.group,
    course: state.changePicker.course,
    semester: state.changePicker.semester,
    session: state.changePicker.session,
    odooServerStatus : state.changePicker.odooServerStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestStudent: () => dispatch(requestStudent()),
    createAttendanceSheet: (data) => dispatch(createAttendanceSheet(data)),
    onChangeRemark: (data) => dispatch(onRemarkChange(data))
  }
}

class SessionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "roll_number",
      selected: {},
      warning: false
    };
  }
  // get all inputed data and request for create attendance sheet
  createAttendanceSheet = () => {
    let { createAttendanceSheet, session, group } = this.props
    let selected = this.state.selected
    let selectedStu = selected[session] !== undefined ? selected[session][group] : []
    let storeData = store.getState()
    let {subject, date, batch, remark, semester, course} = storeData.changePicker
    let data = {
      subject,
      course,
      date: moment(date).format('MM/DD/YY'),
      session,
      batch,
      lines: selectedStu,
      remark: remark,
      semester,
      group
    }
    createAttendanceSheet(data)
  }

  componentDidMount() {
    this.props.requestStudent()
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }
    this.setState({ order, orderBy });
  }
// select all students at one
  handleSelectAllClick = (event, data) => {
    let {selected} = this.state
    let {session, group} = this.props
    if(!session) return this.setState({warning:true})
    if (event.target.checked) {
      if(!(session in selected)){
        let temp = {}
        temp[group] = data.map(n => n.roll_number)
        selected[session] = temp
      }else {
        selected[session][group] =  data.map(n => n.roll_number)
      }
    }else {
      selected[session][group] = []
    }
    this.setState({ selected });
  }
// user input remark data
  onChangeRemark = (event, roll_number) => {
    let storeData = store.getState()
    let { remark } = storeData.changePicker
    remark[roll_number] = event.target.value
    let { onChangeRemark } = this.props
    onChangeRemark(remark)
  }

  handleCloseWarning = () => {
    this.setState({warning:false})
  }

  handleClick = (event, roll_number) => {
    const { selected } = this.state;
    const {session, group} = this.props
    if(!session) return this.setState({warning:true})
    if(session in selected){
      if(group in selected[session]){
        const selectedIndex = selected[session][group].indexOf(roll_number);
        let newSelected = [];
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected[session][group], roll_number);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected[session][group].slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected[session][group].slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected[session][group].slice(0, selectedIndex),
            selected[session][group].slice(selectedIndex + 1)
          );
        }
        selected[session][group] = newSelected
      }else {
        selected[session][group] = [roll_number]
      }
    }else {
      let temp = {}
      temp[group] = [roll_number]
      selected[session] = temp
    }
    this.setState({ selected });
  }

  handleDuplicateSession = (newSelected) => {
    let {course, batch, semester, group, subjectInfo, session} = this.props
    let {selected} = this.state
    if(!(session in selected)) return this.setState({warning:true})
    let sessions = subjectInfo[course][batch][semester][group]['session']
    sessions.filter((e,i) => newSelected.includes(i+1))
    .forEach(sess => {
      if(sess in selected){
        selected[sess][group] = selected[session][group]
      }else{
        let temp = {}
        temp[group] = selected[session][group]
        selected[sess] = temp
      }
    });
    this.setState({selected})
  }

  isSelected = roll_number =>{
    let {session, group} = this.props
    let {selected} = this.state
    if(session in selected){
      return selected[session][group] !== undefined ? selected[session][group].indexOf(roll_number) !== -1 : false;
    }
    return false
  }

  render() {
    const { classes, studentData, batch, session, sessions, sessionNumber, course, group, odooServerStatus} = this.props
    const { order, orderBy, selected } = this.state
    let numSelected = 0
    if(session in selected){
      numSelected =  selected[session][group] !== undefined ? selected[session][group].length : 0
    }
    let data = []
    try{
      data = batch in studentData[course] ? studentData[course][batch][group] : []
    }catch(err){data = []}

    return (
      <>
      <Prompt
        when={Object.keys(selected).length === 0 ? false : true}
        message='You have unsaved changes, are you sure you want to leave?'
      />
      {
        !data ? <h4>Please set course, batch, and group properly</h4>
        : <>
        <Box className={classes.root} boxShadow={2}>
          <SessionTableToolBar numSelected={numSelected} handleDuplicateSession={this.handleDuplicateSession} sessions={sessions} sessionNumber={sessionNumber}/>
          <div className={classes.tableWrapper}>
            <Table aria-labelledby="tableTitle"  >
              <SessionTableHead
                numSelected={numSelected}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={event => this.handleSelectAllClick(event, data)}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy)).map(n => {
                  const isSelected = this.isSelected(n.roll_number);
                  return (
                    <TableRow
                      hover
                      // onClick={event => this.handleClick(event, n.roll_number)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.roll_number}
                      selected={isSelected}>
                      <TableCell padding="checkbox" onClick={event => this.handleClick(event, n.roll_number)}>
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell scope="row" onClick={event => this.handleClick(event, n.roll_number)}>
                        {n.roll_number}
                      </TableCell>
                      <TableCell  align="left" onClick={event => this.handleClick(event, n.roll_number)}>
                        {n.last_name + ' ' +n.name}
                      </TableCell>
                      <TableCell  align="center" onClick={event => this.handleClick(event, n.roll_number)}>
                        {isSelected ? (
                          <div>Yes</div>
                        ) : (
                          <div style={{ color: "#E74C3C" }}>No</div>
                        )}
                      </TableCell>
                      <TableCell className={classes.textRow}>
                        <InputBase align="center" multiline fullWidth={true} onChange={event => this.onChangeRemark(event, n.roll_number)}/>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <Typography variant="subtitle2">
                      Total Present :
                    </Typography>
                  </TableCell>
                  <TableCell >{numSelected}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">Total Absent :</Typography>
                  </TableCell>
                  <TableCell >
                    {data.length - numSelected}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Box>
        <AttendanceButton  onClick={this.createAttendanceSheet}/>
        <OdooServerStatusDialog odooServerStatus={odooServerStatus}/>
        </>
      }
      <DefaultAlert
          icon={
            <Report
              style={{
                width: 150,
                height: 150,
                marginLeft: 60,
                marginRight: 60,
                marginTop: 30
              }}
              color="secondary"
            />
          }
          onClick={this.handleCloseWarning}
          detail="Please selected any session"
          open={this.state.warning}
        />
      </>
    );
  }
}
SessionTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SessionTable));
