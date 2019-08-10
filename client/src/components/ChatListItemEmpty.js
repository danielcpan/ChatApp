import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from '@material-ui/core';

const ChatListItemEmpty = props => {
  const { handleClickOpen } = props

  return (
    <ListItem
      alignItems="flex-start" 
      button
      onClick={handleClickOpen}
    >
      <ListItemAvatar>
        <Avatar style={{fontSize: '36px'}}>!</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={"No Chats!"}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              noWrap
              color="textPrimary"
            >
              Click here to create your first chat!
            </Typography>
          </React.Fragment>
        }
      >
      </ListItemText>
    </ListItem>
  )
}

ChatListItemEmpty.propTypes = {
  handleClickOpen: PropTypes.func.isRequired
}

export default ChatListItemEmpty