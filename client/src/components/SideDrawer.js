import React from 'react';
import PropTypes from 'prop-types';
import { 
  Divider,
  Drawer,
  Hidden 
} from '@material-ui/core';

import UserList from './UserList';
import ChatList from './ChatList';

const SideDrawer = props => {
  const { users, chats, mobileOpen, handleDrawerToggle, classes } = props;

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <UserList users={users} classes={classes} />
          <Divider />
          <ChatList chats={chats} classes={classes} />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <UserList users={users} classes={classes} />
          <Divider />
          <ChatList chats={chats} classes={classes} />
        </Drawer>
      </Hidden>
    </nav>
  )
}

SideDrawer.propTypes = {
  users: PropTypes.array.isRequired,
  chats: PropTypes.array.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired
}

export default SideDrawer;