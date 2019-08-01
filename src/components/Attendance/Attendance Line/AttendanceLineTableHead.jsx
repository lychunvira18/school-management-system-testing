import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
  withStyles
} from "@material-ui/core";
const styles = theme => ({
  text: {
    fontWeight: "bold",
    fontSize: 13
  }
});
const rows = [
  { id: "student", label: "Student" },
  { id: "subject", label: "Subject" },
  { id: "session", label: "Session" },
  { id: "present", label: "Present" },
  { id: "date", label: "Date" },
  { id: "absent", label: "Absent" },
  { id: "classes", label: "Classes" },
  { id: "percentile", label: "Percentile" },
  { id: "remark", label: "Remark" }
];

class AttendanceLineTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, classes } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel
                    className={classes.text}
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}
AttendanceLineTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};
export default withStyles(styles)(AttendanceLineTableHead);
