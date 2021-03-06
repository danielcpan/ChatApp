import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from '@material-ui/core';
import format from 'date-fns/format';

const ChatListItem = (props) => {
  const { chat, match } = props;

  return (
    <ListItem
      alignItems="flex-start"
      button
      selected={chat.id === parseInt(match.params.chatId, 10)}
      key={chat.id}
    >
      <ListItemAvatar>
        <Avatar>{chat.name.charAt(0).toUpperCase()}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          (chat.name.length < 30) ? (chat.name) : (`${chat.name.substr(0, 30)}...`)
        }
        secondary={(
          <>
            <Typography
              component="span"
              variant="body2"
              noWrap
              color="textPrimary"
            >
              {'Created: '}
            </Typography>
            {format(chat.createdAt, 'MMM DD, YYYY')}
          </>
)}
      />
    </ListItem>
  );
};

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
};

export default withRouter(ChatListItem);
