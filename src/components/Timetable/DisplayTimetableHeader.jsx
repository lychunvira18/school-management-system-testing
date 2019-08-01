import React, {useMemo} from'react'
import {Breadcrumbs,Typography} from '@material-ui/core';

function DisplayTimetableHeader({header, week}){
  const memoValue = useMemo(()=>{
    return(
      <>
      {
        header === undefined ? null :
      <div style={{marginTop:30, padding:-10}}>
      <Breadcrumbs separator="/" aria-label="Breadcrumb">
        <Typography color="textPrimary" variant="h5">{header.course}</Typography>
        <Typography color="textPrimary" variant="h5">{header.batch}</Typography>
        <Typography color="textPrimary" variant="h5">{header.semester}</Typography>
        <Typography color="textPrimary" variant="h5">{header.group}</Typography>
        <Typography color="textPrimary" variant="h5">{week}</Typography>
      </Breadcrumbs>
      </div>
      }
      </>
  )
  }, [header, week])
  return memoValue
}
export default DisplayTimetableHeader
