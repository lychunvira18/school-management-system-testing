import "date-fns";
import React, {useEffect, useMemo} from "react";
import DefaultDatePicker from './DefaultDatePicker'
import { connect } from 'react-redux'
import {changeReportStartDate} from '../../redux/ActionCreator/userBehavior'
import {requestSemesterDate} from '../../redux/ActionCreator/apiRequest'
import moment from 'moment'

const StartDatePicker = ({startDate, dispatch, course, batch, semester, group, semDate}) => {
    useEffect(()=> {
        dispatch(requestSemesterDate({course, batch, semester, group}))
    }, [course, batch, semester, group])
    useMemo(()=>{
        if(semDate.length !== 0)
            dispatch(changeReportStartDate(moment(semDate[0].start_date, 'YYYY-MM-DD').toDate()))
    }, [semDate])
 return <DefaultDatePicker
            minDate={semDate.length !== 0? moment(semDate[0].start_date, 'YYYY-MM-DD') : undefined}
            value={startDate}
            label="StartDate"
            onChange={(date) => dispatch(changeReportStartDate(date))}/>
}

export default connect(state => ({semDate: state.initData.semDate}))(StartDatePicker)
