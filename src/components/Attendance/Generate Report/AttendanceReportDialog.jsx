import React from "react";
import {connect} from 'react-redux'
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core"
import { PRINT_ATTENDANCE_REPORT} from '../../../constants/env'


const styles = theme => ({
  root: {
    textAlign: "center",
    width: '100%',
    height: '100%'
  },
  dialogPaper: {
    width: '100%',
    height: '100%'
  },
  dialogContent: {
    height: '100%',
    width:'100%'
  },
  icon: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginLeft: 100,
    marginBottom: 20,
    marginRight: 100
  },
  button: {
    marginRight: 40,
  }
});

const AttendanceReportDialog = ({classes, reportOpen, b64Report, dispatch, startDate, endDate}) =>{

const onClick = () => dispatch({type:PRINT_ATTENDANCE_REPORT, payload:false})
let link = React.createElement('a', {style:{textDecoration:'none'},download:`Attendance Report ${startDate.toDateString()}~${endDate.toDateString()}.pdf`, href:'data:application/octet-stream;base64,' + b64Report}, 'Download');
let obj = React.createElement('embed', {style:{width:'100%', height:'100%'},type:'application/pdf', src:'data:application/pdf;base64,' + b64Report})

return (
    <Dialog
        fullScreen
        fullWidth={true}
        maxWidth='sm'
        disableEscapeKeyDown
        classes={{paper: classes.dialogPaper}}
        open={ reportOpen? true  :false}
        className={classes.root}>
        <DialogContent className={classes.dialogContent}>{obj}</DialogContent>
        <DialogActions>
            <div
                className={classes.button}
                onClick={onClick}
                size='medium'
                variant="outlined"
                color="primary">
                  {link}
            </div>
            <Button
            className={classes.button}
            size='medium'
            variant="outlined"
            color='secondary'
            onClick={onClick}
            >
              Close
            </Button>
        </DialogActions>
    </Dialog>)
}
export default connect(state=>({
  reportOpen:state.initData.reportOpen,
  b64Report:state.initData.b64Report,
}))(withStyles(styles)(AttendanceReportDialog))
