import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import Chats from '../views/Chats'
import { getCurrentUser } from '../actions/authActions';
import { getChats } from '../actions/chatActions';
import { getUsers } from '../actions/userActions';

const drawerWidth = 350;

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'auto'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
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
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  chatName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
    flexGrow: 1,
  },
  content: {
    marginTop: theme.spacing(10),
    flexGrow: 1,
  },  
});

const mapStateToProps = state => ({
  chat: state.chats.currentChat,
  users: state.users.usersList,
  user: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  getChats: () => dispatch(getChats()),
  getCurrentUser: () => dispatch(getCurrentUser()),
  getUsers: () => dispatch(getUsers())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chats))
