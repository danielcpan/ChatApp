import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import SideDrawer from '../components/SideDrawer';
import { getUsers } from '../actions/userActions';
import { getChats } from '../actions/chatActions';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
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

const mapStateToProps = state => ({
  users: state.users.userList,
  chats: state.chats.chatsList
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  getChats: () => dispatch(getChats()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SideDrawer))
