import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import ChatsList from '../components/chats/ChatList'
import { getChat } from '../actions/chatActions';

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

const mapStateToProps = state => ({
  chats: state.chats.chatsList,
})

const mapDispatchToProps = dispatch => ({
  getChat: (id) => dispatch(getChat(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChatsList))
