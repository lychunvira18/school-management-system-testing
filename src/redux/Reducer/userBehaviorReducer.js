import {
    CHANGE_SEMESTER,
    CHANGE_COURSE,
    CHANGE_GROUP,
    CHANGE_FACULTY,
    CHANGE_BATCH,
    CHANGE_SUBJECT,
    CHANGE_REMARK,
    CHANGE_SESSION,
    CHANGE_DATE,
    CHANGE_SEARCH_FIELD,
    TOGGLE_DIALOG,
    SET_SUBJECTS,
    CHANGE_REPORT_END_DATE,
    CHANGE_REPORT_START_DATE,
    SET_SELECTED_FACULTY,
    PRINT_REPORT_LOADING
} from '../../constants/env'

const initialPicker = {
    batch : 'Batch 4',
    subject : 'Common',
    session: '',
    date : new Date(),
    remark: {},
    group :'Group 1',
    faculty: '',
    semester : 'Semester 1',
    course: 'Software Engineering',
    searchField: '',
    odooServerStatus : false,
    subjects : [],
    endDate : new Date(),
    startDate : new Date(),
    selectedFaculty : {},
    printReportLoading : false,
}

export const changePicker = (state=initialPicker, action={}) => {
    switch(action.type) {
        case CHANGE_BATCH:
            return Object.assign({}, state, {batch:action.payload})
        case CHANGE_SUBJECT:
            return Object.assign({}, state, {subject:action.payload})
        case CHANGE_SESSION:
            return Object.assign({}, state, {session:action.payload})
        case CHANGE_DATE:
            return Object.assign({}, state, {date:action.payload})
        case CHANGE_REMARK:
            return Object.assign({}, state, {remark:action.payload})
        case CHANGE_SEMESTER:
            return Object.assign({}, state, {semester:action.payload})
        case CHANGE_COURSE:
            if(!action.payload) return state
            return Object.assign({}, state, {course:action.payload})
        case CHANGE_FACULTY:
            return Object.assign({}, state, {faculty:action.payload})
        case CHANGE_GROUP:
            return Object.assign({}, state, {group:action.payload})
        case CHANGE_SEARCH_FIELD:
            return { ...state, ...{searchField:action.payload}}
        case TOGGLE_DIALOG:
            return { ...state, ...{odooServerStatus:action.payload}}
        case SET_SUBJECTS:
            return {...state, ...{subjects:action.payload}}
        case CHANGE_REPORT_END_DATE:
            return {...state, ...{endDate:action.payload}}
        case CHANGE_REPORT_START_DATE:
            return {...state,...{startDate:action.payload}}
        case SET_SELECTED_FACULTY:
            return {...state, ...{selectedFaculty:action.payload}}
        case PRINT_REPORT_LOADING:
            return {...state, ...{printReportLoading:action.payload}}
        default:
            return state
    }
}