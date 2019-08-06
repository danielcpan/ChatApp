import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, ListItem, ListItemText, ListItemAvatar, Typography} from '@material-ui/core';

export default function ChatListItem(props) {
  const { id, name, users, messages } = props.chat;
  const { selectedId = 0, getTextPreview, handleListItemClick } = props;

  return (
    <ListItem 
      alignItems="flex-start" 
      button 
      selected={id === selectedId}
      onClick={ e => handleListItemClick(e, id)}
      key={id}>
      <ListItemAvatar>
        <Avatar>{users[0].username.charAt(0).toUpperCase()}</Avatar>
      </ListItemAvatar>
      {messages.length > 0 ? (
        <ListItemText
          primary={`id: ${id} - ${name}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                noWrap
                color="textPrimary"
              >
                {`${messages[0].user.username}: `}
              </Typography>
              {getTextPreview(messages[0])}
            </React.Fragment>
          }
        />
      ) : (
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                noWrap
                color="textPrimary"
              >
                No messages yet!
              </Typography>
            </React.Fragment>
          }
        />
      )}
    </ListItem>
  )
}

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
  selectedId: PropTypes.number,
  getTextPreview: PropTypes.func.isRequired,
  handleListItemClick: PropTypes.func.isRequired
}