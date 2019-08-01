import React, {useState} from "react";
import PropTypes from "prop-types";
import { withStyles} from "@material-ui/core";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import DropBox from './DropBox'

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120
  }
});

const DuplicateSession = ({items, classes, handleDuplicateSession, valFrom, label}) => {

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDuplicate = () => {
    setOpen(false);
    let temp = selected
    handleDuplicateSession(temp)
    clearSelected([])
  }

  const handleChangeTo = e => {
    setSelected(e.target.value)
  }

  const clearSelected = () => {
    setSelected([])
  }

  return (
    <div>
        <IconButton onClick={handleClickOpen} color='primary' >
          {label}
        </IconButton>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Selected to duplicate</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <DropBox placeholder={"Duplicate From"}
                       items={items ? items : []}
                       value = {valFrom}
                       disable
                  />

              <DropBox placeholder={"Duplicate To"}
                       handleChange={handleChangeTo}
                       items={items ? items.filter(e=> e !== valFrom) : []}
                       checkBox
                       selected={selected}
                       clearSelected={clearSelected}/>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleCloseDuplicate} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  )
}



DuplicateSession.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DuplicateSession)
