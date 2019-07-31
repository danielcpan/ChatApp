import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import format from 'date-fns/format';


import CssBaseline from '@material-ui/core/CssBaseline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from '@material-ui/core/styles';
import { List, ListSubheader, Grid, Divider, Avatar, Fab, Icon} from '@material-ui/core';

import ChatList from '../components/chats/ChatList';
import MessageContainer from '../components/messages/MessageContainer';



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '30vw',
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
  fab: {
    margin: theme.spacing(1),
  },
});

class Chats extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     chats: []
  //   }
  // }

  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={3}>
          <ChatList></ChatList>
        </Grid>
        <Grid item xs={9}>
          <MessageContainer></MessageContainer>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Chats);