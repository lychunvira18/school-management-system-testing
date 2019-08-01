import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import DuplicateSession from "../../Timetable/Genereate TimeTable/DuplicateSession";
import { Toolbar, Typography, withStyles } from "@material-ui/core";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import OpenInNew from "@material-ui/icons/OpenInNew";

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing(3)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },

  spacer: {
    flex: "1 1 10%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

const SessionTableToolBar = props => {
  const {
    numSelected,
    classes,
    handleDuplicateSession,
    sessions,
    sessionNumber
  } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} presented
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Student
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <DuplicateSession
          items={sessions}
          label={<OpenInNew />}
          handleDuplicateSession={handleDuplicateSession}
          valFrom={sessionNumber}
        />
      </div>
    </Toolbar>
  );
};

SessionTableToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

export default withStyles(toolbarStyles)(SessionTableToolBar);
