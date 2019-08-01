import React from 'react'
import {
    TableCell,
    Tooltip,
    TableSortLabel,
} from "@material-ui/core"

const TableColumn = ({id, numeric, orderBy, order, classes, label, disablePadding}) => {
    return (
    <TableCell
            key={id}
            align={numeric ? "left" : "center"}
            sortDirection={orderBy === id ? order : false}
            padding={disablePadding ? "none" : "default"}>
    <Tooltip title="Sort" enterDelay={300}>
        <TableSortLabel
            className={classes.text}
            active={orderBy === id}
            direction={order}
            // onClick={this.createSortHandler(id)}
        >
            {label}
        </TableSortLabel>
    </Tooltip>
</TableCell>);
}
export default TableColumn