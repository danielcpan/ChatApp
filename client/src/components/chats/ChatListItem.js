import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, ListItem, ListItemText, ListItemAvatar, Typography} from '@material-ui/core';

export default function ChatListItem(props) {
  const { id, name, users, messages } = props.chat;
  const { getTextPreview } = props;

  return (
    <ListItem button alignItems="flex-start" key={id}>
      <ListItemAvatar>
        <Avatar>{users[1].username.charAt(0).toUpperCase()}</Avatar>
      </ListItemAvatar>
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
              {`${messages[0].user.username}: `}
            </Typography>
            {getTextPreview(messages[0])}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
  getTextPreview: PropTypes.func.isRequired
}