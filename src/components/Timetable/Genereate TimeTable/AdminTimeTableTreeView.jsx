import React, { useEffect, useState } from "react";
import {
  requestTimeTableData,
  requestTimeTableView
} from "../../../redux/ActionCreator/apiRequest";
import { connect } from "react-redux";
import {
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Box,
  Table,
  makeStyles
} from "@material-ui/core";
import EditTimeTableDialog from "./EditTimeTableDialog";

const styles = makeStyles(theme => ({
  root: {
    witdth: "100%",
    marginTop: theme.spacing(2)*3,
  },
  table: {
      minWroll_numberth: 1020,
  },
  tableHead: {
      backgroundColor: theme.palette.primary.light,
  },
  tableCell:{
      color:'white'
  }

}));
export default  connect(state=> ({TTView:  state.initData.TTView, editTT:state.initData.editTT}))(({dispatch, TTView, editTT, ...others})=> {

    const classes = styles()
    const {course, batch, semester, group} = others
    const columns = ['Week', 'Course', 'Batch', 'Semester', 'Start Date', 'End Date', 'State']
    const [open, setOpen] = useState(false);
    const [week, setWeek] = useState({})
    const [editMode, setEditMode] = useState(false)

    useEffect(()=>{
        dispatch(requestTimeTableView({course, batch, semester, group}))
    }, [course, batch, semester, group])

    const handleRowClick = (data)  => {
        dispatch(requestTimeTableData({course, batch, semester, group, 'week': data.name}))
        setOpen(true);
        setWeek({...data})
    }
    const handleClose = () => {
        setOpen(false)
        setEditMode(false)
    }

    const handleChange = () => event => {
        setEditMode(!editMode);
    };

    return (
        <Box className={classes.root} boxShadow={2}>
            <Table>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        {
                            columns.map(c => <TableCell
                                            className={classes.tableCell}
                                            variant="head"
                                            key={c}
                                           >
                                                {c}
                                            </TableCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                        {
                            TTView['data'] === undefined ? null
                            : TTView['data'].map(e => (
                                <TableRow hover key={e.name} onClick ={()=>handleRowClick(e)}>
                                    <TableCell>{e.name}</TableCell>
                                    <TableCell>{course}</TableCell>
                                    <TableCell>{batch}</TableCell>
                                    <TableCell>{semester}</TableCell>
                                    <TableCell>{e.startDate}</TableCell>
                                    <TableCell>{e.endDate}</TableCell>
                                    <TableCell>{e.state}</TableCell>
                                </TableRow>
                            ))
                        }
                </TableBody>
            </Table>
            <EditTimeTableDialog
                handleChange={handleChange}
                open={open}
                editMode={editMode}
                handleClose={handleClose}
                header={{course, batch, semester, group}}
                currentWeek={week}
                editTT={editTT}
                {...others}/>
        </Box>
    )
})
