import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

export default connect(state=> ({userProfile:state.initData.userProfile}))(({ component: Component, userProfile, route, ...rest }) => {
    return <>
    {
        userProfile.role === undefined ? null :
        <Route {...rest} render={(props) => (
            userProfile.role === 'admin' || userProfile.role === 'faculty' ?
               <Component {...props} /> :
               <Redirect to={{ pathname: '/sms/timetable/student', state: { from: props.location }}} />
        )} />
    }
    </>

})