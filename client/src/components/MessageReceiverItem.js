import React from 'react';
import PropTypes from 'prop-types';

import {
  Avatar, ListItemAvatar, ListItem, ListItemText, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  received: {
    color: 'black',
    backgroundColor: '#f1f0f0',
    borderRadius: 20,
    padding: theme.spacing(0.85, 2),
  },
}));

const MessageReceiverItem = (props) => {
  const classes = useStyles();
  const { message } = props;

  if (message.user) {
    return (
      <ListItem>
        <Grid
          container
          alignItems="flex-start"
          wrap="nowrap"
        >
          <Grid item>
            <ListItemAvatar>
              <Avatar>
                {message.user.username.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
          </Grid>
          <Grid item>
            <ListItemText
              id={message.id}
              primary={message.text}
              className={classes.received}
            />
          </Grid>
        </Grid>
      </ListItem>
    );
  }
  return null;
};

MessageReceiverItem.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageReceiverItem;
