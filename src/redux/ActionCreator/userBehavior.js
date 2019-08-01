// handle user behavior
import {
    CHANGE_BATCH,
    CHANGE_SESSION,
    CHANGE_REMARK,
    CHANGE_DATE,
    CHANGE_SEMESTER,
    CHANGE_COURSE,
    CHANGE_GROUP,
    CHANGE_FACULTY,
    CHANGE_SUBJECT,
    CHANGE_SEARCH_FIELD,
    TOGGLE_DIALOG,
    SET_SUBJECTS,
    CHANGE_REPORT_END_DATE,
    CHANGE_REPORT_START_DATE,
    SET_SELECTED_FACULTY,
    PRINT_REPORT_LOADING
} from '../../constants/env'

export const onBatchChange = (data) => ({type:CHANGE_BATCH, payload:data})
export const onSubjectChange = (data) => ({type:CHANGE_SUBJECT, payload:data})
export const onSessionChange = (data) => ({type:CHANGE_SESSION, payload:data})
export const onDateChange = (data) => ({type:CHANGE_DATE, payload:data})
export const onRemarkChange = (data) => ({type:CHANGE_REMARK, payload:data})
export const onSemesterChange = (data) => ({type:CHANGE_SEMESTER, payload:data})
export const onCourseChange = (data) => ({type:CHANGE_COURSE, payload:data})
export const onFacultyChange = (data) => ({type:CHANGE_FACULTY, payload:data})
export const onGroupChange = (data) => ({type:CHANGE_GROUP, payload:data})
export const onSearchFieldChange = (data) => ({type:CHANGE_SEARCH_FIELD, payload:data})
export const toggleDialog = (data) => ({type:TOGGLE_DIALOG, payload:data})
export const setSubjects = (data) => ({type:SET_SUBJECTS, payload:data})
export const changeReportEndDate = (data) => ({type:CHANGE_REPORT_END_DATE, payload:data})
export const changeReportStartDate = (data) => ({type:CHANGE_REPORT_START_DATE, payload:data})
export const setSelectedFaculty = (data) => ({type:SET_SELECTED_FACULTY, payload:data})
export const setReportLoading =(data) => ({type:PRINT_REPORT_LOADING, payload:data})