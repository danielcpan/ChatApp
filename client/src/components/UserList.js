import React from 'react';
import { 
  List, 
  ListSubheader, 
  Grid, 
} from '@material-ui/core';

import UserListItem from './users/UserListItem';
import UserListItemEmpty from './users/UserListItemEmpty';

const UserList = (props) => {
  const { users, classes } = props;

  return (
    <List 
      dense
      className={classes.root} 
      subheader={
        <Grid container>
          <Grid item xs={10}>
            <ListSubheader className={classes.header}>
              Online Users ({users.length})
            </ListSubheader>
          </Grid>
        </Grid>
      }>
      {(users.length > 0) ? (
        users.map(user => (          
          <UserListItem user={user} key={user.id} />
        ))
      ) : (
        <UserListItemEmpty />
      )}
    </List>
  )
}

export default UserList;