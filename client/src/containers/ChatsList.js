import { connect } from 'react-redux';

import ChatList from '../components/ChatList';
import { getChat } from '../actions/chatActions';

const mapDispatchToProps = dispatch => ({
  getChat: id => dispatch(getChat(id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ChatList);
