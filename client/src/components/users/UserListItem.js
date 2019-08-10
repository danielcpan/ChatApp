import React from 'react';
import PropTypes from 'prop-types';
import { 
  Avatar, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Typography
} from '@material-ui/core';

const UserListItem = props => {
  const { id, username, email } = props.user;

  return (
    <ListItem 
      alignItems="flex-start" 
      button 
      key={id}>
      <ListItemAvatar>
        <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
      </ListItemAvatar>
        <ListItemText primary={username} secondary={email} />
    </ListItem>
  )
}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserListItem;