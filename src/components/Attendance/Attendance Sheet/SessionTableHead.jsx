import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
  Checkbox,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  text: {
    fontSize: 13,
    color:'white'
  },
  tableHead: {
    backgroundColor: theme.palette.primary.light
  }
});
const rows = [
  {
    id: "roll_number",
    numeric: true,
    disablePadding: false,
    label: "Roll Number"
  },
  { id: "name", numeric: true, disablePadding: false, label: "Student Name" },
  { id: "present", numeric: false, disablePadding: true, label: "Present ?" },
  { id: "remark", numeric: false, disablePadding: false, label: "Remark" }
];

class SessionTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      classes,
    } = this.props;
    return (
      <TableHead className={classes.tableHead}>
        <TableRow> 
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => (
            <TableCell
              variant="head"
              key={row.id}
              align={row.numeric ? "left" : "center"}
              padding={row.disablePadding ? "none" : "default"}
              sortDirection={orderBy === row.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={row.numeric ? "bottom-end" : "bottom-start"}
                enterDelay={200}
              >
                <TableSortLabel
                style={{color:'white'}}
                  className={classes.text}
                  active={orderBy === row.id}
                  direction={order}
                  onClick={this.createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}
SessionTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default withStyles(styles)(SessionTableHead)
