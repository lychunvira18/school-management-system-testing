import React from "react";
import { toggleDialog } from '../../redux/ActionCreator/userBehavior'
import DefaultAlert from './DefaultDialog'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import Cancel from '@material-ui/icons/Cancel'
import {connect} from 'react-redux'

const OdooServerStatusDialog = ({odooServerStatus, dispatch}) =>{

  let icon = ''
  let detail = ''
  let error = ''
  const iconStyle = {width:150, height:150,marginLeft:60, marginRight:60, marginTop:30}
  if (odooServerStatus !==  false){
    if (odooServerStatus.result === 'ok') {
      detail = 'Data Saved!'
      iconStyle['color'] = '#4caf50'
      icon = <CheckCircleOutline style={iconStyle} />
    }else {
      detail = `${odooServerStatus.error.message}`
      icon = <Cancel style={iconStyle} color='secondary'/>
      error = odooServerStatus.error.data.arguments[0]
    }
  }
  return <DefaultAlert
          onClick={() => dispatch(toggleDialog(!odooServerStatus))}
          icon={icon}
          open={odooServerStatus ? true :false}
          detail={detail}
          error={error}/>
}
export default connect()(OdooServerStatusDialog)
