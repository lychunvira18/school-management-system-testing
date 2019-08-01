import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from "@material-ui/core";
import MenuContent from './MenuContent'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';


const style = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function SideBarDrawer  ({toggleDrawer, userProfile, open, classes, items}) {
  return (
    <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
        <div
            className={classes.list}
            role="presentation"
            onClick={()=>toggleDrawer(false)}
            onKeyDown={()=>toggleDrawer(false)}>
              <Grid container justify="center" alignItems="center" style={{padding:30}}>
                {
                  userProfile['profile'] !== undefined ?
                  <Avatar style={{margin: 10,width: 60,height: 60}} alt="avatar" src={`data:image/png;base64, ${userProfile['profile']}`}/>:
                  null
                }
              </Grid>
              <Divider/>
            <MenuContent items={items} toggleDrawer={toggleDrawer}/>
        </div>
    </Drawer>);
}

export default withStyles(style)(SideBarDrawer)
