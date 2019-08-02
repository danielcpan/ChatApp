import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { List, Grid, InputBase, Icon, IconButton } from '@material-ui/core';

import MessageReceiverItem from './MessageReceiverItem';
import MessageSenderItem from './MessageSenderItem';
import { getChat, getChats, createMessage } from '../../actions/chatActions';


const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '100vh',
    marginTop: theme.spacing(7)
  },
  inline: {
    display: 'inline',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  input: {
    width: '100%',
    color: 'black',
    backgroundColor: '#f1f0f0',
    borderRadius: 20,
    padding: theme.spacing(0.4, 2),
    margin: theme.spacing(1, 2),
  },
  rightIcon: {
    color: 'rgb(0, 153, 255)',
  },
  sendIcon: {
    marginLeft: theme.spacing(3)
  },
});

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  componentWillMount() {
    this.props.getChat(this.props.chatId);
  }

  onSubmit = async e => {
    e.preventDefault();
    if (this.state.text.length === 0) return;

    const data = {
      text: this.state.text,
      timestamp: new Date(),
      chatId: this.props.chat.id,
      userId: 1
    }
    await this.props.createMessage(data)
    // await this.props.getChats();
    this.setState({text: ''})
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView();
  }  

  render() {
    const { classes } = this.props;
    const { messages = [] } = this.props.chat

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <List dense>
            {messages.map(message => {
              if (message.userId === 1) {
                return <MessageSenderItem key={message.id} message={message} />
              } else {
                return <MessageReceiverItem key={message.id} message={message} />
              }
            })}
          </List>
        </Grid>
        <Grid item xs={10}>
          <form autoComplete="off" onSubmit={this.onSubmit}>
          <InputBase
            className={classes.input}
            name="text"
            value={this.state.text}
            onChange={this.onChange}
          />
          </form>
        </Grid>
        <Grid item xs={2}>
          <IconButton 
            size="medium" 
            aria-label="send" 
            className={classes.sendIcon}
            ref={el => this.el = el}
          >
            <Icon className={classes.rightIcon}>send</Icon>
          </IconButton>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  chat: state.chats.currentChat
})

const mapDispatchToProps = dispatch => ({
  getChat: (id) => dispatch(getChat(id)),
  getChats: (id) => dispatch(getChats()),
  createMessage: (text) => dispatch(createMessage(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MessageContainer));