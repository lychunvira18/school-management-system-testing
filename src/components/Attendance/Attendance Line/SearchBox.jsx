import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { onSearchFieldChange } from '../../../redux/ActionCreator/userBehavior'
import { connect } from 'react-redux'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

const SearchBox = ({classes, searchField, dispatch}) => {
  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase className={classes.input} placeholder="Search Student Name" onChange={event => dispatch(onSearchFieldChange(event.target.value))}/>
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} />
    </Paper>
  );
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(state => ({searchField: state.changePicker.searchField}))(withStyles(styles)(SearchBox))