import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import MessageContainer from '../components/messages/MessageContainer'
import { getChat, getChats, sendMessage } from '../actions/chatActions';

const drawerWidth = 350;

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '100vh',
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(7)
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
  appBar: {
    top: 'auto',
    bottom: 0,
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },    
  },  
  rightIcon: {
    color: 'rgb(0, 153, 255)',
  },
  sendIcon: {
    marginLeft: theme.spacing(3)
  },
});

const mapStateToProps = state => ({
  chat: state.chats.currentChat,
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = dispatch => ({
  getChat: (id) => dispatch(getChat(id)),
  getChats: () => dispatch(getChats()),
  sendMessage: (text) => dispatch(sendMessage(text))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MessageContainer))
