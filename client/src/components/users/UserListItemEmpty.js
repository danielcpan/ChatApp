import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from '@material-ui/core';

const UserListItemEmpty = props => {

  return (
    <ListItem
      alignItems="flex-start" 
      button
    >
      <ListItemAvatar>
        <Avatar style={{fontSize: '36px'}}>!</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={"No Users Online"}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              noWrap
              color="textPrimary"
            >
              Invite a friend to chat!
            </Typography>
          </React.Fragment>
        }
      >
      </ListItemText>
    </ListItem>
  )
}


export default UserListItemEmpty;