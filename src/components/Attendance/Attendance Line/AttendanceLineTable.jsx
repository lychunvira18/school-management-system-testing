import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TableFooter, TablePagination } from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import AttendanceLineTableHead from "./AttendanceLineTableHead";
import { connect } from 'react-redux'
import {getAttendanceLine} from '../../../redux/ActionCreator/apiRequest'

const styles = theme => ({
  root: {
    width: "100%"
  },
  table: {
    minWidth: 1020
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

const AttendanceLineTable = ({classes, attendanceLine, searchField, dispatch}) => {

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowPerPage] = useState(20)
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("student")

  const handleChangePage = (event, page) => {
    setPage(page)
  };

  const handleChangeRowsPerPage = event => {
    setPage(0)
    setRowPerPage(parseInt(event.target.value))
  };

  const handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (orderBy === property && order === "desc") {
      order = "asc";
    }
    setOrder(order)
    setOrderBy(orderBy)
  };

  useEffect(()=>{
    let data = {}
    data['lineNumber'] = rowsPerPage
    if('lastId' in attendanceLine){
      data['lastId'] = attendanceLine.lastId
    }
    if(attendanceLine.data === undefined || page >= attendanceLine.data.length) dispatch(getAttendanceLine(data))
  }, [page])


  let filteredData = []
  if(attendanceLine.data !== undefined){
    filteredData = attendanceLine.data.filter(line => line.student.toLowerCase().includes(searchField.toLowerCase()))
  }
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <AttendanceLineTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(filteredData, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover key={index}>
                      <TableCell
                        component="th"
                        className={classes.textRow}
                        scope="row"
                      >
                        {row.student}
                      </TableCell>
                      <TableCell className={classes.textRow} padding="none">
                        {row.subject}
                      </TableCell>
                      <TableCell className={classes.textRow} padding="none">
                        {row.session}
                      </TableCell>
                      <TableCell className={classes.textRow}>
                        {row.present ? <div>Yes</div> : <div>No</div>}
                      </TableCell>
                      <TableCell className={classes.textRow} padding="none">
                        {row.date}
                      </TableCell>
                      <TableCell className={classes.textRow}>
                        {row.absent}
                      </TableCell>
                      <TableCell className={classes.textRow}>
                        {row.classes}
                      </TableCell>
                      <TableCell className={classes.textRow}>
                        {row.percentile}
                      </TableCell>
                      <TableCell>{row.remark}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[20, 30, 40, 50]}
                  colSpan={9}
                  count={filteredData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }


AttendanceLineTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(state => ({
  attendanceLine: state.initData.attendanceLine,
  requestAttendanceLinePending: state.initData.requestAttendanceLinePending,
  requestAttendanceLineFalied: state.initData.requestAttendanceLineFalied,
  searchField: state.changePicker.searchField
}))(withStyles(styles)(AttendanceLineTable))
