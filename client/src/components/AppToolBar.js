import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';

import AppToolBarUserItem from './AppToolBarUserItem';

const AppToolBar = (props) => {
  const {
    chat, handleDrawerToggle, handleLogoutRedirect, classes,
  } = props;

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
          {chat.name}
        </Typography>
        <AppToolBarUserItem handleLogoutRedirect={handleLogoutRedirect} />
      </Toolbar>
    </AppBar>
  );
};

AppToolBar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  handleLogoutRedirect: PropTypes.func.isRequired,
};

export default AppToolBar;
