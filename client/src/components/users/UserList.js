import React from 'react';
import PropTypes from 'prop-types';
import { 
  List, 
  ListSubheader, 
  Grid, 
  Divider,
  Fab,
  Icon,
  Link
} from '@material-ui/core';

import UserListItem from './UserListItem';
import UserListItemEmpty from './UserListItemEmpty';
import ChatListItem from '../ChatListItem';

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

  renderChatList = () => {
    return (
      this.props.chats.map((chat, idx) => (          
        <Link 
          to={`/chats/${chat.id}`} 
          key={`chat_${chat.id}_index_${idx}`}
          style={{ textDecoration: 'none', color: 'black' }} 
          onClick={() => this.props.getChat(chat.id)}
        >
          <ChatListItem 
            chat={chat}
            selectedId={this.state.selectedId}
            getTextPreview={this.getTextPreview} 
            handleListItemClick={this.handleListItemClick}
          >
          </ChatListItem>
        </Link>
      ))
    )
  }  

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <List 
          dense
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
      <Divider />
      <List 
        dense
        className={classes.root} 
        subheader={
          <Grid container>
            <Grid item xs={10}>
              <ListSubheader className={classes.header}>
                Chats
              </ListSubheader>
            </Grid>
            <Grid item xs={2}>
              <Fab 
                size="small" 
                color="secondary" 
                aria-label="edit" 
                className={classes.fab}
                onClick={this.handleClickOpen}
              >
                <Icon>edit_icon</Icon>
              </Fab>
              </Grid>            
          </Grid>
        }>
        {this.renderChatList()}
      </List>      
    </React.Fragment>
    )
  }
}

export default UsersList;