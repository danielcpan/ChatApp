import React from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemText, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  sent: {
    color: 'white',
    backgroundColor: 'rgb(0, 153, 255)',
    borderRadius: 20,
    padding: theme.spacing(0.85, 2)
  },
}));

export default function MessageSenderItem(props) {
  const classes = useStyles();
  const { id, text } = props.message;

  return (
    <ListItem>
      <Grid container alignItems="flex-start" justify="flex-end" direction="row">
        <Grid item>
          <ListItemText id={id} primary={text} className={classes.sent}/>
        </Grid>
      </Grid>
    </ListItem>
  )
}

MessageSenderItem.propTypes = {
  message: PropTypes.object.isRequired
}