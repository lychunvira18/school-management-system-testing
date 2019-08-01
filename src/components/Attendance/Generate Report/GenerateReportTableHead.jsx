import React from "react";
import PropTypes from "prop-types";
import { TableHead, TableRow, withStyles } from "@material-ui/core";
import TableColumn from "../../Table/TableColumn";
const styles = theme => ({
  text: {
    fontSize: 13,
    color: "white"
  },
  header: {
    backgroundColor: theme.palette.primary.light
  }
});

const GenerateReportTableHead = ({ order, orderBy, classes, subjects }) => {
  return (
    <TableHead className={classes.header} data-test="tableHeadComponent">
      <TableRow>
        <TableColumn
          numeric={true}
          disablePadding={false}
          id="no"
          label="No."
          order={order}
          orderBy={orderBy}
          classes={classes}
        />
        <TableColumn
          numeric={true}
          disablePadding={false}
          id="roll"
          label="Roll number"
          order={order}
          orderBy={orderBy}
          classes={classes}
        />
        <TableColumn
          numeric={true}
          disablePadding={true}
          id="name"
          label="Name"
          order={order}
          orderBy={orderBy}
          classes={classes}
        />
        {subjects.map(subject => (
          <TableColumn
            numeric={true}
            disablePadding={true}
            order={order}
            orderBy={orderBy}
            classes={classes}
            label={subject.subject}
            key={subject.subject}
          />
        ))}
        <TableColumn
          numeric={false}
          disablePadding={true}
          id="total"
          label="Total"
          order={order}
          orderBy={orderBy}
          classes={classes}
        />
      </TableRow>
    </TableHead>
  );
};
GenerateReportTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};
export default withStyles(styles)(GenerateReportTableHead);
