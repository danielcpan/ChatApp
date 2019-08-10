import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import { 
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core';

import AppBarUserItem from './AppBarUserItem';

const AppToolBar = props => {
  const { handleDrawerToggle, handleLogoutRedirect, classes } = props;

  return (
    <AppBar 
      position="fixed" 
      elevation={1} 
      color="inherit" 
      className={classes.appBar}
    >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <Typography noWrap className={classes.chatName}>
        Chat App
      </Typography>
      <AppBarUserItem handleLogoutRedirect={handleLogoutRedirect}/>
    </Toolbar>
  </AppBar>
  )
}

export default AppToolBar;