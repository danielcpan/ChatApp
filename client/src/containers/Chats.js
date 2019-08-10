import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import Chats from '../views/Chats'
import { getCurrentUser } from '../actions/authActions';
import { getChat, getChats } from '../actions/chatActions';
import { getUsers } from '../actions/userActions';

const drawerWidth = 350;

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'auto'
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  chatName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
    flexGrow: 1,
  },
});

const mapStateToProps = state => ({
  chat: state.chats.currentChat
})

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
  getChat: (id) => dispatch(getChat(id)),
  getUsers: () => dispatch(getUsers()),
  getChats: () => dispatch(getChats()),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chats))
