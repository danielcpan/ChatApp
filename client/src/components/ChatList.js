import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import { 
  List, 
  ListSubheader, 
  Grid, 
  Fab,
  Icon,
} from '@material-ui/core';

import ChatListItem from './ChatListItem';
import ChatForm from './ChatForm';

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      isFormOpen: false,
    }
  }

  handleListItemClick = (event, idx) => {
    this.setState({ selectedId: idx })
  }

  handleClickOpen = () => {
    this.setState({ isFormOpen: true })
  }

  handleClose = () => {
    this.setState({ isFormOpen: false })
  }

  render() {
    const { chats, classes } = this.props;

    return (
      <React.Fragment>
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
          {chats.map((chat, idx) => (          
            <Link 
              to={`/chats/${chat.id}`} 
              key={`chat_${chat.id}_index_${idx}`}
              style={{ textDecoration: 'none', color: 'black' }} 
              onClick={() => this.props.getChat(chat.id)}
            >
              <ChatListItem 
                chat={chat}
                selectedId={this.state.selectedId}
                handleListItemClick={this.handleListItemClick}
              >
              </ChatListItem>
            </Link>
          ))}
        </List>
        <ChatForm isFormOpen={this.state.isFormOpen} handleClose={this.handleClose}/>
      </React.Fragment>
    )
  }
}

ChatList.propTypes = {
  chats: Proptypes.array.isRequired
}

export default ChatList;