import React from "react"
import {
  MenuItem,
  TextField,
  InputAdornment,
  withStyles
} from "@material-ui/core/";

const styles = theme => ({
  margin: {
    margin: theme.spacing(3)
  },
  textFile: {
    fontSize: 14
  }
});

const DefaultPicker = ({ classes, value, handleOnChange, label, menuItem}) => {
  return <TextField
          fullWidth
          width={280}
          select
          autoFocus
          className={classes.margin}
          value={value}
          onChange={event => handleOnChange(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment
                disableTypography={true}
                className={classes.textFile}
                position="start">
                <b>{label}</b>{" "}
              </InputAdornment>
            )
          }}
        >
          {Object.values(menuItem).map((val, index) => {
            return (
              <MenuItem key={index} value={val}>
                {val}
              </MenuItem>
            )
          })}
        </TextField>
}
export default withStyles(styles)(DefaultPicker);
