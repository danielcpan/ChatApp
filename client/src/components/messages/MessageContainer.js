import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { 
  List, 
  Grid, 
  Icon, 
  TextField, 
  IconButton, 
  AppBar, 
  Toolbar
 } from '@material-ui/core';

import MessageReceiverItem from './MessageReceiverItem';
import MessageSenderItem from './MessageSenderItem';

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  componentWillMount() {
    const { chatId } = this.props.match.params || {};

    if (chatId) {
      this.props.getChat(chatId);
    }
  }

  onSubmit = async e => {
    e.preventDefault();
    if (this.state.text.length === 0) return;

    const data = {
      text: this.state.text,
      timestamp: new Date(),
      chatId: this.props.chat.id,
    }
    await this.props.sendMessage(data)
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
              if (message.userId === this.props.currentUser.id) {
                return <MessageSenderItem key={message.id} message={message} />
              } else {
                return <MessageReceiverItem key={message.id} message={message} />
              }
            })}
          </List>
        </Grid>
        <Grid item>
          <div style={{ float:"left", clear: "both" }}
            // Temp solution to scroll down
            ref={el => {this.el = el}}>{`.`}
          </div>
        </Grid>
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item xs={10}>
              <form autoComplete="off" onSubmit={this.onSubmit}>
                <TextField
                  placeholder="Test"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  style={{backgroundColor: "#f1f0f0", width: '100%'}}
                >
                </TextField>
              </form>
            </Grid>

            <Grid item xs={2}>
              <IconButton 
                size="medium" 
                aria-label="send" 
                className={classes.sendIcon}
              >
                <Icon className={classes.rightIcon}>send</Icon>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>        
      </Grid>
    )
  }
}

MessageContainer.propTypes = {
  chat: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  getChat: PropTypes.func.isRequired,
  getChats: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default withRouter(MessageContainer);