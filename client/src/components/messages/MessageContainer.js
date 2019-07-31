import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getChat } from '../../actions/chatActions';


import CssBaseline from '@material-ui/core/CssBaseline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from '@material-ui/core/styles';
import { List, Avatar, ListItemAvatar, ListItem, ListItemText, Grid, InputBase, Icon, IconButton } from '@material-ui/core';




const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: '30vw',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '100vh',
    // border: 1,
    // borderColor: 'black',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 28,
    // width: 50,
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
  },
  sent: {
    color: 'white',
    backgroundColor: 'rgb(0, 153, 255)',
    borderRadius: 20,
    padding: theme.spacing(0.85, 2)
  },
  received: {
    color: 'black',
    backgroundColor: '#f1f0f0',
    borderRadius: 20,
    padding: theme.spacing(0.85, 2)    
  },
  input: {
    width: '100%',
    color: 'black',
    backgroundColor: '#f1f0f0',
    borderRadius: 20,
    padding: theme.spacing(0.4, 2),
    margin: theme.spacing(0, 2)
  },
  rightIcon: {
    color: 'rgb(0, 153, 255)',
  },
  sendIcon: {
    marginLeft: theme.spacing(3)
    // margin: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing(1),
  },
});

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: {}
    }
  }

  componentWillMount() {
    console.log("here")
    this.props.getChat();
  }

  render() {
    const { classes } = this.props;
    const { messages = [] } = this.props.chat
    console.log("messages: ")
    console.log(messages)
    // console.log(this.props.chat)

    return (
      <Grid container className={classes.root}>
        <Grid item>
          <List dense>
          {messages.map(message => {
            if (message.userId === 1) {
              return (
                <ListItem key={message.id}>
                  <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <Grid item>
                      <ListItemText id={message.id} primary={message.text} className={classes.sent}/>
                      {/* <Chip color="primary" label={message.text} /> */}
                    </Grid>
                  </Grid>
                </ListItem>
              );
            } else {
              return (
                <ListItem key={message.id}>
                  <Grid container alignItems="flex-start" wrap='nowrap'>
                    <Grid item>
                      <ListItemAvatar>
                          <Avatar>{message.user.username.charAt(0).toUpperCase()}</Avatar>
                      </ListItemAvatar>
                    </Grid>
                    <Grid item>
                      <ListItemText id={message.id} primary={message.text} className={classes.received}/>
                    </Grid>
                  </Grid>
              </ListItem>
              )       
            }
          })}
        </List>
      </Grid>
      <Grid item xs={10}>
        <InputBase
            className={classes.input}
            defaultValue="Naked input"
            inputProps={{ 'aria-label': 'naked' }}
          />
        </Grid>
        <Grid item xs={2}>
        {/* <Button variant="contained" size="small">
          <Icon className={classes.rightIcon}>send</Icon>
        </Button> */}
        {/* <Fab size="small" aria-label="send" className={classes.sendIcon}>
          <Icon className={classes.rightIcon}>send</Icon>
        </Fab>     */}
        <IconButton aria-label="delete" className={classes.sendIcon}>
        <Icon className={classes.rightIcon}>send</Icon>
        </IconButton>            
          {/* <Icon className={classes.rightIcon}>send</Icon> */}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  chat: state.chats.currentChat
})

const mapDispatchToProps = dispatch => ({
  getChat: () => dispatch(getChat())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MessageContainer));