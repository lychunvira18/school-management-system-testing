import React from "react";
import { connect } from "react-redux";
import AttendanceLineTable from "./AttendanceLineTable";
import SearchBox from "./SearchBox";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from '@material-ui/core/Typography'

const AttendanceLine = ({ attendanceLine }) => {
  return (
    <div
      style={{
        flexGrow: 1,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: 1400
      }}
    >
      <div style={{margin:'auto', width:400}}><Typography variant='h4'><b>Attendance Line</b></Typography></div>
      {attendanceLine.length === 0 ? <LinearProgress /> : null}
      <SearchBox />
      <br />
      <AttendanceLineTable />
    </div>
  );
};
export default connect(state => ({
  attendanceLine: state.initData.attendanceLine
}))(AttendanceLine);
