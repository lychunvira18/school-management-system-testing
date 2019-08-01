import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { InputAdornment } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

export default ({value, onChange , label, maxDate=new Date(), minDate}) =>{
    return (
      <MuiPickersUtilsProvider
          style={{width:280}} utils={DateFnsUtils}>
        <KeyboardDatePicker
          format="MM/dd/yyyy"
          autoOk
          minDate = {minDate}
          maxDate ={maxDate}
          inputVariant='outlined'
          autoFocus
          fullWidth
          variant="inline"
          value={value}
          onChange={onChange}
          InputProps={{
            startAdornment: (
              <InputAdornment
                disableTypography={true}
                position="start"
                style={{fontSize:14,}}
              >
                <b>{label}:</b>
              </InputAdornment>
            )
          }}
        />
      </MuiPickersUtilsProvider>
    );
}


