import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  ListItemText
} from "@material-ui/core/";

const styles = theme => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function DropBox({
  classes,
  items,
  value,
  placeholder,
  handleChange,
  selected,
  checkBox = false,
  disable,
  clearSelected
}) {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="age-simple">{placeholder}</InputLabel>
      {checkBox ? (
        <Select
          multiple
          value={selected}
          onChange={handleChange}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {items.map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selected.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Select
          value={value}
          disabled={disable}
          onChange={handleChange}
          input={<Input id="age-simple" />}
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
}

DropBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DropBox);
