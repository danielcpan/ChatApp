import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { 
  Avatar, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Typography
} from '@material-ui/core';

const ChatListItem = props => {
  const { chat } = props;

  return (
    <ListItem 
      alignItems="flex-start" 
      button 
      selected={chat.id == props.match.params.chatId}
      key={chat.id}>
      <ListItemAvatar>
        <Avatar>{chat.name.charAt(0).toUpperCase()}</Avatar>
      </ListItemAvatar>
      <ListItemText
          primary={
            (chat.name.length < 30) ? (chat.name) : (`${chat.name.substr(0, 30)}...`)}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                noWrap
                color="textPrimary"
              >
              </Typography>
              description here!
            </React.Fragment>
          }
        />
    </ListItem>
  )
}

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
}

export default withRouter(ChatListItem);