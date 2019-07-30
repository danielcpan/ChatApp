import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { getChats } from '../../actions/chatActions';


import CssBaseline from '@material-ui/core/CssBaseline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from '@material-ui/core/styles';
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Divider, Typography} from '@material-ui/core';



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline',
  },
  truncate: {
    // width: 50,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }  
});

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    }
  }

  componentWillMount() {
    this.props.getChats();
  }

  onSubmit = async () => {

  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  
  getDate(date) {
    const messageDate = new Date(date);

    if (this.isWithinTwentyFourHours(messageDate)) {
      return format(messageDate, 'h:MM A')
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

  render() {
    const { classes } = this.props;
    // const { name } = this.state;
    console.log(this.props.chats)

    return (
      <List className={classes.root}>
        {this.props.chats.map(chat => (
          <ListItem alignItems="flex-start" key={chat.id}>
            <ListItemAvatar>
              <Avatar>{chat.users[1].username.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={chat.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    noWrap
                    color="textPrimary"
                  >
                    {/* {chat.messages[0].user.username} */}
                    {/* <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      noWrap
                    >
                      {`: ${chat.messages[0].text.substr(0,100)} - ${this.getDate(chat.messages[0].createdAt)}`}
                    </Typography> */}
                    {`${(chat.messages[0].user.username + ': ' + chat.messages[0].text).substr(0,35) + '...'} - ${this.getDate(chat.messages[0].createdAt)}`}
                    {/* <span>{`: ${chat.messages[0].text.substr(0,100)} - ${this.getDate(chat.messages[0].createdAt)}`}</span> */}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        // <Divider variant="inset" component="li" />
        ))}
    </List>
    )
  }
}

ChatList.propTypes = {
  getChats: PropTypes.func.isRequired,
  chats: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  chats: state.chats.chatsList
})

const mapDispatchToProps = dispatch => ({
  getChats: () => dispatch(getChats())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatList));