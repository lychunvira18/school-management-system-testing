import React from "react";
import { Link } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
export default ({items, toggleDrawer}) =>  {
  return <>
    {items.map((item, key) => {
        return<Link  to={`/sms/${item.path}`} onClick={toggleDrawer(false)} key={key} style={{textDecoration:'none', color:'gray'}}>
            <StyledMenuItem>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </StyledMenuItem>
        </Link>
    })}
  </>
}
