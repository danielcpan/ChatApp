import React from 'react';
import PropTypes from 'prop-types';
import { 
  List, 
  ListSubheader, 
  Grid, 
} from '@material-ui/core';

import UserListItem from './UserListItem';
import UserListItemEmpty from './UserListItemEmpty';

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      isFormOpen: false
    }
  }

  renderUserList = () => {
    return (
      this.props.users.map((user, idx) => (          
        <UserListItem 
          user={user}
          key={user.id}
        >
        </UserListItem>
      ))
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <List 
          className={classes.root} 
          subheader={
            <Grid container>
              <Grid item xs={10}>
                <ListSubheader className={classes.header}>
                  Online Users ({this.props.users.length})
                </ListSubheader>
              </Grid>
            </Grid>
          }>

          {(this.props.users.length > 0) ? (
            this.renderUserList()
          ) : (
            <UserListItemEmpty />
          )}
      </List>
    </React.Fragment>
    )
  }
}

export default UsersList;