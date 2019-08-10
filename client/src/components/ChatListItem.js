import React from 'react';
import PropTypes from 'prop-types';
import { 
  Avatar, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Typography
} from '@material-ui/core';

const ChatListItem = props => {
  const { id, name } = props.chat;
  const { selectedId = 0, getTextPreview, handleListItemClick } = props;

  return (
    <ListItem 
      alignItems="flex-start" 
      button 
      selected={id === selectedId}
      onClick={ e => handleListItemClick(e, id)}
      key={id}>
      <ListItemAvatar>
        <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
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
  selectedId: PropTypes.number,
  getTextPreview: PropTypes.func.isRequired,
  handleListItemClick: PropTypes.func.isRequired
}

export default ChatListItem;