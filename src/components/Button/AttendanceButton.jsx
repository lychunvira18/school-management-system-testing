import React from "react";
import {
  Button,
  Grid,
} from "@material-ui/core";

const AttendanceButton = ({onClick}) =>{
  return <>
  <Grid container justify="flex-end" alignItems="flex-end">
  <Button color="primary" onClick={onClick} style={{margin:'10px'}}variant="contained"> Save </Button>
  </Grid>
  </>
}
export default AttendanceButton
