import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { withStyles } from '@material-ui/core/styles';
import { List, ListSubheader, Grid, Fab, Icon} from '@material-ui/core';

import { getChats } from '../../actions/chatActions';
import ChatListItem from './ChatListItem';

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

  getTextPreview = (message) => {
    const { user: { username }, text, timestamp } = message;
    const previewLength = 50 - username.length;
    const preview = text.substr(0, previewLength);
    const ellipsis = text.length > previewLength ? '...' : '';
    const date = this.getDate(timestamp);

    return `${preview}${ellipsis} · ${date}`
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

    return (
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
            <Fab size="small" color="secondary" aria-label="edit" className={classes.fab}>
              <Icon>edit_icon</Icon>
            </Fab>
            </Grid>
          </Grid>
        }>
        {this.props.chats.map(chat => (          
          <ChatListItem 
            chat={chat} 
            getTextPreview={this.getTextPreview} 
            key={chat.id}
          >
          </ChatListItem>
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