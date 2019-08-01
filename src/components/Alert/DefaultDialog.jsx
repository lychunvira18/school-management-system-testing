import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from "@material-ui/core";


const styles = theme => ({
  root: {
    textAlign: "center"
  },
  button: {
    marginRight: 10
  }
});

const DefaultAlert = ({open, classes, onClick, error, icon, detail}) =>{
  return (
    <Dialog
        open={open}
        className={classes.root}>
        <Grid container justify="center" alignItems="center" >
          {icon}
        </Grid>
        <DialogTitle>{detail}</DialogTitle>
        <DialogContent>{error}</DialogContent>
        <DialogActions>
            <Button
                className={classes.button}
                onClick={onClick}
                size="large"
                variant="outlined"
                color="primary">
                OK
            </Button>
        </DialogActions>
    </Dialog>)
}
export default (withStyles(styles)(DefaultAlert))
