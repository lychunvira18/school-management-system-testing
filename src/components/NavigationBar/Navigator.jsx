import React, { useState, useEffect } from "react";
import {
  AppBar,
  IconButton,
  Tab,
  Tabs,
  Toolbar
} from "@material-ui/core";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core";
import SideBarDrawer from '../NavigationBar/SideBarDrawer'
import Input from '@material-ui/icons/Input'
import Person from '@material-ui/icons/Person'
import Group from '@material-ui/icons/Group'
import Subtitles from '@material-ui/icons/Subtitles'
import List from '@material-ui/icons/List'
import Print from '@material-ui/icons/Print'



const styles = theme => ({
  root: {
    flexGrow: 1
  },

  iconButtonBlock: {
    fontSize: 10,
    height: 10
  },
  menuButton: {
    marginRight: 0,
    marginLeft: -20
  },
  hide: {
    display: "none"
  },
  tabs: {
    flexGrow: 1
  },
  tab: {
    minWidth: 0,
    textColor: "#fff"
  }
});

const navBar = [
  "Discuss",
  "OpenEduCat",
  "Attendance",
  "Assignments",
  "Event",
  "TimeTable",
  "Exams",
  "Library",
  "Apps",
];

const NavigationBar = ({ classes, history, userProfile }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [route, setRoute] = useState("/sms/attendance");

  useEffect(() => {
    const pathnameSplit = history.location.pathname.split("/");

    if (history.location.pathname !== route)
      setRoute(
        [pathnameSplit[0], pathnameSplit[1], pathnameSplit[2]].join("/")
      );
  });

  const changeNavigateRoute = (event, route) => {
    if(!(route.includes('timetable') || route.includes('attendance')) ){
      switch(route){
        case "/sms/assignments" :
          return  window.location.href = 'http://192.168.7.222:8069/web#page=0&limit=80&view_type=list&model=op.assignment&menu_id=209&action=264'
        case "/sms/event":
          return window.location.href = 'http://192.168.7.222:8069/web#view_type=kanban&model=event.event&menu_id=392&action=405'
        case "/sms/discuss":
          return window.location.href ='http://192.168.7.222:8069/web#action=106&active_id=channel_inbox'
        case "/sms/exams":
          return window.location.href = "http://192.168.7.222:8069/web#page=0&limit=80&view_type=list&model=op.exam.session&menu_id=270&action=327"
        case "/sms/library":
          return window.location.href ="http://192.168.7.222:8069/web#view_type=form&model=board.board&menu_id=222&action=295"
        case "/sms/apps":
          return window.location.href ="http://192.168.7.222:8069/web#view_type=kanban&model=ir.module.module&menu_id=51&action=36"
        case "/sms/openeducat":
          return window.location.href ="http://192.168.7.222:8069/web#view_type=kanban&model=op.student&menu_id=175&action=238"
        default:
          return
      }
    }
    setRoute(route)
    history.push(route);
  };

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenuOpen(open);
  };

  var items = [];
  if (history.location.pathname.includes("/timetable")) {
    items = [
      {
        path: "timetable/admin-create",
        label: "Generate Timetable",
        icon: <Input />
      },
      { path: "timetable/student", label: "Student", icon: <Group /> },
      { path: "timetable/faculty", label: "Faculty", icon: <Person /> }
    ];
  } else {
    items = [
      {
        path: "attendance/attendance_sheet",
        label: "Attendance Sheet",
        icon: <Subtitles />
      },
      {
        path: "attendance/attendance_line",
        label: "Attendance Lines",
        icon: <List />
      },
      {
        path: "attendance/generate_report",
        label: "Generate Report",
        icon: <Print />
      }
    ];
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            className={menuOpen ? classes.hide : classes.menuButton}>
                <MenuIcon />
            </IconButton>
            <SideBarDrawer open={menuOpen} toggleDrawer={toggleDrawer} items={items} userProfile={userProfile}/>
            <Tabs
              variant="scrollable"
              scrollButtons="off"
              className={classes.tabs}
              value={route}
              onChange={changeNavigateRoute}
            >
              {navBar.map(label => (
                <Tab
                  label={label}
                  className={classes.tab}
                  key={label}
                  value={`/sms/${label.toLowerCase()}`}
                />
              ))}
            </Tabs>
          </Toolbar>
        </AppBar>
      </div>
    );
}
export default connect(state=>({userProfile: state.initData.userProfile}))(withStyles(styles)(NavigationBar))
