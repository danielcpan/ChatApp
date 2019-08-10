import React from 'react';
import PropTypes from 'prop-types';
import { 
  Avatar, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
} from '@material-ui/core';

const UserListItem = props => {
  const { user } = props

  return (
    <ListItem 
      alignItems="flex-start" 
      button 
      key={user.id}>
      <ListItemAvatar>
        <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
      </ListItemAvatar>
        <ListItemText 
          primary={
            (user.username.length < 30) ? (
              user.username
            ) : (
              `${user.username.substr(0,30)}...`
            )}
          secondary={
            (user.email.length < 30) ? (
              user.email
            ) : (
              `${user.email.substr(0,30)}...`
            )} 
          />
    </ListItem>
  )
}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserListItem;