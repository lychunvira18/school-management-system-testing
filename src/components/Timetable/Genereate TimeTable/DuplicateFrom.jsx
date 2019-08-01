import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core/";

const styles = theme => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120
  }
});

class DuplicateFrom extends React.Component {
  state = {
    open: false,
    session: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <FormControl className={classes.formControl}>
          <InputLabel>Duplicate from:</InputLabel>
          <Select
            value={this.state.session}
            onChange={this.handleChange("session")}
            input={<Input id="session-simple" />}
          >
            <MenuItem value={1}>Session 1</MenuItem>
            <MenuItem value={2}>Session 2</MenuItem>
            <MenuItem value={3}>Session 3</MenuItem>
            <MenuItem value={4}>Session 4</MenuItem>
            <MenuItem value={5}>Session 5</MenuItem>
            <MenuItem value={6}>Session 6</MenuItem>
            <MenuItem value={7}>Session 7</MenuItem>
            <MenuItem value={8}>Session 8</MenuItem>
            <MenuItem value={9}>Session 9</MenuItem>
          </Select>
        </FormControl>
      </>
    );
  }
}

DuplicateFrom.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DuplicateFrom);
