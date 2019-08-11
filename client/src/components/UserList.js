import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListSubheader,
  Grid,
} from '@material-ui/core';

import UserListItem from './UserListItem';
import UserListItemEmpty from './UserListItemEmpty';

const UserList = (props) => {
  const { users, classes } = props;

  return (
    <List
      dense
      className={classes.root}
      subheader={(
        <Grid container>
          <Grid item xs={10}>
            <ListSubheader className={classes.header}>
              Online Users (
              {users.length}
)
            </ListSubheader>
          </Grid>
        </Grid>
)}
    >
      {(users.length > 0) ? (
        users.map(user => (
          <UserListItem user={user} key={user.id} />
        ))
      ) : (
        <UserListItemEmpty />
      )}
    </List>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
