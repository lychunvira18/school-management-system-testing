import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Typography,
  LinearProgress
} from "@material-ui/core";
import GenerateReportTableHead from "./GenerateReportTableHead";
import DownloadButton from "../../Button/DownloadButton";
import {
  getReportAttendanceLine,
  requestStudent,
  printAttendanceReport
} from "../../../redux/ActionCreator/apiRequest";
import moment from "moment";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    marginTop: 10
  },
  table: {
    minWidth: 1020
  },
  textRow: {
    fontSize: 13
  },
  button: {
    margin: theme.spacing(3)
  },
  leftIcon: {
    marginRight: theme.spacing(3)
  },

  iconSmall: {
    fontSize: 20
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
  if (!array) return [];
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

const GenerateReportTable = props => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("roll_number");

  let {
    attendanceReportData,
    dispatch,
    studentData,
    batch,
    group,
    endDate,
    startDate,
    course,
    classes,
    subjectInfo,
    semester
  } = props;

  const handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (orderBy === property && order === "desc") {
      order = "asc";
    }
    setOrder(order);
    setOrderBy(orderBy);
  };

  const handleClickPrintReport = () => {
    dispatch(
      getReportAttendanceLine({
        course,
        batch,
        semester,
        group,
        endDate: moment(endDate).format("YYYY-MM-DD"),
        startDate: moment(startDate).format("YYYY-MM-DD")
      })
    );
  };

  const printPdfReport = () => {
    dispatch(
      printAttendanceReport({
        course,
        semester,
        batch,
        group,
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD")
      })
    );
  };

  useEffect(() => {
    if (Object.keys(studentData).length === 0) {
      dispatch(requestStudent());
    }
  }, []);

  let subjects = [];
  try {
    if (Object.keys(subjectInfo).length !== 0) {
      subjects = subjectInfo[course][batch][semester][group]["subjects"];
    }
  } catch {}

  let res = {};
  if (attendanceReportData.data !== undefined) {
    attendanceReportData.data.forEach(line => {
      if (line.student in res) {
        if (line.subject in res[line.student]) {
          res[line.student][line.subject] += 1;
        } else {
          res[line.student][line.subject] = 1;
        }
      } else {
        let temp = {};
        temp[line.subject] = 1;
        res[line.student] = temp;
      }
    });
  }
  let total = 0;

  return (
    <>
      <div style={{ margin: "auto", width: "12%" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickPrintReport}
          style={{ width: "100%", marginTop: 10 }}
        >
          Print Report
        </Button>
      </div>
      {Object.keys(res).length !== 0 ? (
        <>
          <Box className={classes.root} boxShadow={3}>
            <Table className={classes.table} id="attendanceReport">
              <GenerateReportTableHead
                subjects={subjects}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {studentData[course] === undefined
                  ? null
                  : stableSort(
                      studentData[course][batch][group],
                      getSorting(order, orderBy)
                    ).map((row, i) => {
                      total = 0;
                      return (
                        <TableRow hover key={row.roll_number}>
                          <TableCell className={classes.textRow}>
                            {++i}
                          </TableCell>
                          <TableCell className={classes.textRow}>
                            {row.roll_number}
                          </TableCell>
                          <TableCell className={classes.textRow} padding="none">
                            {row.last_name + " " + row.name}
                          </TableCell>
                          {subjects.map((e, i) => {
                            let key = row.last_name + " " + row.name;
                            if (res[key] !== undefined) {
                              if (e.subject in res[key]) {
                                total += res[key][e.subject];
                              }
                            }
                            return (
                              <TableCell
                                className={classes.textRow}
                                padding="none"
                                key={i}
                              >
                                {res[key] === undefined
                                  ? 0
                                  : e.subject in res[key]
                                  ? res[key][e.subject]
                                  : 0}
                              </TableCell>
                            );
                          })}
                          <TableCell className={classes.textRow}>
                            {total}
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </Box>
          {props.printReportLoading ? <LinearProgress /> : null}
          <DownloadButton classes={classes} handleClick={printPdfReport} />
        </>
      ) : (
        <Typography variant="subtitle1" component="h2">
          No Records...
        </Typography>
      )}
    </>
  );
};

GenerateReportTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GenerateReportTable);
