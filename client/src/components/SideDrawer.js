import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';

import UserList from './UserList';
import ChatList from './ChatList';

const SideDrawer = props => {
  const { users, chats, classes } = props;

  return (
    <React.Fragment>
      <UserList users={users} classes={classes} />
      <Divider />
      <ChatList chats={chats} classes={classes} />
    </React.Fragment>
  )
}

export default SideDrawer;