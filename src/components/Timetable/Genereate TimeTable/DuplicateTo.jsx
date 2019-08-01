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
  root: {
    display: "flex",
    flexWrap: "wrap"
  },

  formControl: {
    margin: theme.spacing(3),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing(3) / 4
  },
  noLabel: {
    marginTop: theme.spacing(3) * 3
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
const names = [
  "Session 1",
  "Session 2",
  "Session 3",
  "Session 4",
  "Session 5",
  "Session 6",
  "Session 7",
  "Session 8",
  "Session 9"
];

class DuplicateTo extends React.Component {
  state = {
    name: []
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      name: value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-checkbox">
          Duplicate to:
        </InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

DuplicateTo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DuplicateTo);
