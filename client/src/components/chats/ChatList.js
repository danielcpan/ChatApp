import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { withStyles } from '@material-ui/core/styles';
import { List, ListSubheader, Grid, Fab, Icon, ListItem, ListItemText, Typography, ListItemAvatar, Avatar} from '@material-ui/core';

import { getCurrentUser } from '../../actions/authActions';
import { getChat, getChats } from '../../actions/chatActions';
import ChatListItem from './ChatListItem';
import ChatListItemEmpty from './ChatListItemEmpty';
import ChatForm from './ChatForm';

import { Link, Route, Switch, Redirect } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    overflow: 'auto',
  },
  inline: {
    display: 'inline',
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
    padding: theme.spacing(1)
  },
  fab: {
    margin: theme.spacing(1),
  },
});

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      selectedId: null,
      isFormOpen: false
    }
  }

  async componentWillMount() {
    await this.props.getCurrentUser();
    await this.props.getChats();
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  getTextPreview = (message) => {
    const { user: { username }, text, timestamp } = message;
    const previewLength = 50 - username.length;
    const preview = text.substr(0, previewLength);
    const ellipsis = text.length > previewLength ? '...' : '';
    const date = this.getDate(timestamp);

    return `${preview}${ellipsis} · ${date}`
  }
  
  getDate(date) {
    // console.log("date: " + date)
    const messageDate = new Date(date);
    // console.log("messageDate: " + messageDate)
    // console.log("format(messageDate, 'h:MM A'): " + format(messageDate, 'h:MM A'))

    if (this.isWithinTwentyFourHours(messageDate)) {
      return format(messageDate, 'h:MM A')
      // return messageDate
    } else if (this.isWithinWeek(messageDate)) {
      return format(messageDate, 'ddd')
    } else if (this.isWithinYear(messageDate)) {
      return format(messageDate, 'MMM DD')
    } else {
      return format(messageDate, 'MMM DD, YYYY')
    }
  }

  isWithinTwentyFourHours(date) {
    const twentyFourHoursAgo = new Date().getTime() - (1 * 24 * 60 * 60 * 1000)

    return date >= twentyFourHoursAgo
  }

  isWithinWeek(date) {
    const currentDate = new Date();
    const lastWeek = new Date(currentDate.setDate(currentDate.getDate() - 7))

    return date >= lastWeek
  }

  isWithinYear(date) {
    const currentDate = new Date();
    
    return (date.getFullYear() === currentDate.getFullYear())
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
          {(this.props.chats.length > 0) ? (
            this.renderChatList()
          ) : (
            <ChatListItemEmpty handleClickOpen={this.handleClickOpen} />
          )}
      </List>
      <ChatForm isFormOpen={this.state.isFormOpen} handleClose={this.handleClose}/>
    </React.Fragment>
    )
  }
}

ChatList.propTypes = {
  getChat: PropTypes.func.isRequired,
  getChats: PropTypes.func.isRequired,
  chats: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  chat: state.chats.currentChat,
  chats: state.chats.chatsList,
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  getChat: (id) => dispatch(getChat(id)),
  getChats: () => dispatch(getChats()),
  getCurrentUser: () => dispatch(getCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatList));