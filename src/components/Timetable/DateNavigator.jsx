import React from 'react'
import { Button, Toolbar, withStyles}
from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import DuplicateSession from './Genereate TimeTable/DuplicateSession'
import OpenInNew from '@material-ui/icons/OpenInNew'
import moment from 'moment'

const styles = theme => ({

    container1: {
        display: "flex",
        flexWrap: "wrap"
    },
    piker:{
        margin:15,
        // margin: theme.spacing(3)*2,
    },

    margin: {
        width:'100%',
        margin:0,
        textRendering: 'auto',
        letterSpacing: 'normal',
        textAlign:'center',
        fontSize:14,
        wordSpacing: 'normal',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',

    },
    left: {
        flexGrow:1
    },
    right: {

    },
    middle: {
        flexGrow:1
    }

})

const DateNavigator = ({classes, handleLastWeek, handleDuplicateTimetable,
    handleCurrentWeek, weekEndDate,weekStartDate, handleNextWeek, disableCurrentWeek,
    week, weekStr, open, setOpen, ...rest}) => {

    const {subjectInfo, course, batch, semester, group} = rest

    let items = []
    let weekStartIndex = 0
    let weekEndIndex = 0
    try{
        let weeks = subjectInfo[course][batch][semester][group]['week']
        weekStartIndex = weeks.findIndex(e => e.name === weekStr)
        weekEndIndex = weeks.length -1
        items = weeks.map(e=>e.name)
    }catch{}

    console.log({weekStr, weekStartIndex, weekEndIndex});

    return (
        <Toolbar style={{ marginBottom: -6}}>
            <span className={classes.left}>
            <Button size="small" color="primary" className="button" variant="outlined" onClick={handleLastWeek} disabled={weekStartIndex <= 0} >
                <KeyboardArrowLeft fontSize={'inherit'} />
                Last
            </Button>

            <Button size="small" color="primary" className="button" variant="outlined" onClick={handleCurrentWeek} disabled={disableCurrentWeek} >
                Current
            </Button>

            <Button size="small"  color="primary" className="button" variant="outlined" onClick={handleNextWeek} disabled={weekStartIndex === weekEndIndex}>
                Next
                <KeyboardArrowRight fontSize={'inherit'}/>
            </Button>

            </span>
            <span className={classes.middle}>
                {
                    weekEndDate && weekStartDate ?
                    <b>{moment(weekStartDate, 'YYYY-MM-DD').format("ddd MM/DD")+ '~' + moment(weekEndDate, 'YYYY-MM-DD').format("ddd MM/DD")}</b> : null
                }
            </span>
            <span className={classes.right}>
            <DuplicateSession
                label={<OpenInNew/>}
                valFrom = {weekStr}
                items={items}
                handleDuplicateSession={handleDuplicateTimetable}/>
            </span>
        </Toolbar>
    );
}
export default withStyles(styles)(DateNavigator)