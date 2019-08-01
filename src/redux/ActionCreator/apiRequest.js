import {
    REQUEST_STUDENTS_SUCCESS,
    REQUEST_FAILED,
    REQUEST_ATTENDANCE_LINE_SUCCESS,
    REQUEST_ATTENDANCE_LINE_PENDING,
    REQUEST_ATTENDANCE_LINE_FAILED,
    TOGGLE_DIALOG,
    REQUEST_SUBJECT_DATA,
    PRINT_ATTENDANCE_REPORT,
    SET_REPORT_B64,
    GET_SESSION_DATA,
    SET_USER_IDENTITY,
    SET_FACULTY_TIMETABLE,
    SET_STUDENT_TIMETABLE,
    SET_TIMETABLE_VIEW,
    SET_EDIT_TT,
    SET_UID,
    SET_SEM_DATE,
    PRINT_REPORT_LOADING,
    SET_ATTENDANCE_REPORT_DATA
} from '../../constants/env'
import {odooRequest, odooPrintReport} from '../api'
// Helper functino

// group data based on batch name
const groupByBatch = (data) =>  {
    let res = {}
    data.forEach(e => {
        let batch = e.batch_id[1]
        let course = e.course_id[1]
        let group = e.class_id[1]
        if(course in res){
            if(batch in res[course]){
                if(group in res[course][batch]){
                    res[course][batch][group].push(e)
                }else{
                    res[course][batch][group] = [e]
                }
            }else {
                let temp = {}
                temp[group] = [e]
                res[course][batch] = temp
            }
        }  else{
            res[course] = {}
            res[course][batch] = {}
            res[course][batch][group] = [e]
        }
    })
    return res
}

// Make request to odoo using xmlrpc or fetch request


// request student data
export const requestStudent= () => (dispatch) => {
    odooRequest('op.student', 'search_read', ['name', 'last_name', 'roll_number', 'class_id', 'batch_id', 'course_id'])
    .then(data => {
        dispatch({type: REQUEST_STUDENTS_SUCCESS, payload:groupByBatch(data)})
    })
    .catch(err => dispatch({type: REQUEST_FAILED, data:err}))
}

export const requestSemesterDate = ({course, batch, semester, group}) => (dispatch) => {
    odooRequest('op.semester', 'search_read', ['start_date', 'end_date'],
     [['course_id.name', '=', course],
      ['batch_id.name', '=', batch],
      ['class_id.name', '=', group],
      ['name', '=', semester]])
    .then(res => dispatch({type:SET_SEM_DATE, payload:res}))
    .catch(err =>console.log(err))
}

export const createAttendanceSheet= (data) => (dispatch) => {
    fetch('http://192.168.7.240:8008/create-attendance-sheet',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: TOGGLE_DIALOG, payload: data}))
    .catch(err => dispatch({type: TOGGLE_DIALOG, payload: err}))
}

export const getAttendanceLine = (data) => (dispatch) => {
    dispatch({type: REQUEST_ATTENDANCE_LINE_PENDING})
    fetch('http://192.168.7.240:8008/get-attendance-line', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
    })
    .then(res => res.json())
    .then( data => dispatch({type: REQUEST_ATTENDANCE_LINE_SUCCESS, payload:JSON.parse(data.result)}))
    .catch(err => dispatch({type:REQUEST_ATTENDANCE_LINE_FAILED, payload:err}))
}

export const getReportAttendanceLine = (data) => (dispatch) => {
    dispatch({type: REQUEST_ATTENDANCE_LINE_PENDING, payload:true})
    fetch('http://192.168.7.240:8008/get-attendance-line', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
    })
    .then(res => res.json())
    .then( data =>{
        dispatch({type: SET_ATTENDANCE_REPORT_DATA, payload:JSON.parse(data.result)})
        dispatch({type: REQUEST_ATTENDANCE_LINE_PENDING, payload:false})
    })
    .catch(err => dispatch({type:REQUEST_ATTENDANCE_LINE_FAILED, payload:err}))
}

export const getSubjectData = () => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-subject-data')
    .then(res => res.json())
    .then(data => dispatch({type:REQUEST_SUBJECT_DATA, payload:data}))
    .catch( err => console.log(err))

}

export const getSessionData = () => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-session-data')
    .then(res => res.json())
    .then(data => dispatch({type:GET_SESSION_DATA, payload:data}))
    .catch( err => console.log(err))
}

export const printAttendanceReport = (data) => (dispatch) => {
    dispatch({type:PRINT_REPORT_LOADING, payload:true})
    odooPrintReport('sms2.attendance_report_qweb',data)
    .then(value =>{
        const b64 = value.result
        dispatch({type:PRINT_ATTENDANCE_REPORT, payload:b64})
        dispatch({type:SET_REPORT_B64, payload:b64})
        dispatch({type:PRINT_REPORT_LOADING, payload:false})
    })
    .catch(err => console.log(err))

}

export const saveTimeTable = (data) => (dispatch) => {
    fetch('http://192.168.7.240:8008/create-timetable',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: TOGGLE_DIALOG, payload: data}))
    .catch(err => dispatch({type: TOGGLE_DIALOG, payload: err}))
}

export const requestUserTimetable = (data) => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-user-timetable',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: SET_USER_IDENTITY, payload:JSON.parse(data.result)}))
    .catch(err => console.log(err));
}

export const requestFacultyTimeTable = (data) => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-faculty-timetable',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: SET_FACULTY_TIMETABLE, payload:JSON.parse(data.result)}))
    .catch(err => console.log(err));
}

export const requestStudentTimeTable = (data) => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-student-timetable',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: SET_STUDENT_TIMETABLE, payload:JSON.parse(data.result)}))
    .catch(err => console.log(err));
}

export const requestTimeTableView = (data) => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-timetable-view',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: SET_TIMETABLE_VIEW, payload:JSON.parse(data.result)}))
    .catch(err => console.log(err));
}

export const requestTimeTableData = (data) => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-timetable-data',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: SET_EDIT_TT, payload:JSON.parse(data.result)}))
    .catch(err => console.log(err));
}

export const getUid = () => (dispatch) => {
    fetch('http://192.168.7.240:8008/get-user-profile',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : {}
        })
       })
    .then(response => response.json())
    .then(data => dispatch({type: SET_UID, payload:JSON.parse(data.result)}))
    .catch(err => console.log(err));
}

export const editTimeTable = (data) => (dispatch) => {
    fetch('http://192.168.7.240:8008/edit-time-table',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            params : data
        })
       })
       .then(response => response.json())
       .then(data => dispatch({type: TOGGLE_DIALOG, payload: data}))
       .catch(err => dispatch({type: TOGGLE_DIALOG, payload: err}))
}
