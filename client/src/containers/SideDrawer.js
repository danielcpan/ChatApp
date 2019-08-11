import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import SideDrawer from '../components/SideDrawer';
import { getChats } from '../actions/chatActions';

const drawerWidth = 350;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    overflow: 'auto',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
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

const mapStateToProps = state => ({
  onlineUsers: state.users.onlineUsers,
  chats: state.chats.chatsList
})

const mapDispatchToProps = dispatch => ({
  getChats: () => dispatch(getChats()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SideDrawer))
