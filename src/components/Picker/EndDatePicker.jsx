import "date-fns";
import React, {useMemo} from "react";
import DefaultDatePicker from './DefaultDatePicker'
import { connect } from 'react-redux'
import {changeReportEndDate} from '../../redux/ActionCreator/userBehavior'
import moment from 'moment'

const EndDatePicker = ({endDate, dispatch, semDate}) => {
    useMemo(()=>{
        if(semDate.length !== 0)
            dispatch(changeReportEndDate(moment(semDate[0].end_date, 'YYYY-MM-DD').toDate()))
    }, [semDate])
 return <DefaultDatePicker
            maxDate={semDate.length !== 0? moment(semDate[0].end_date, 'YYYY-MM-DD') : undefined}
            value={endDate}
            label="EndDate"
            onChange={date=> dispatch(changeReportEndDate(date))}/>
}

export default connect(state => ({semDate: state.initData.semDate}))(EndDatePicker)
