import io from 'socket.io-client';
import {
  DELIVER_CREATED_CHAT_TO_ONLINE_CLIENTS,
  DELIVER_MESSAGE_TO_ONLINE_CLIENTS
} from './constants/actionTypes'
import {
  REGISTER_SOCKET_USER_ID,
  RECEIVED_MESSAGE,
  CREATED_CHAT,
} from './constants/socketEventTypes';

const socketUrl = "http://localhost:5000"
const socket = io(socketUrl);

const configureSocket = (dispatch, getState) => {
  socket.on('connect', () => {
    console.log(`SocketIO connected at ${socketUrl}`);
    socket.emit(REGISTER_SOCKET_USER_ID, getState().auth.currentUser.id)
  });

  socket.on(CREATED_CHAT, data => {
    dispatch({ type: DELIVER_CREATED_CHAT_TO_ONLINE_CLIENTS, payload: data });
  });  

  socket.on(RECEIVED_MESSAGE, data => {
    dispatch({ type: DELIVER_MESSAGE_TO_ONLINE_CLIENTS, payload: data });
  });

  return socket;
};

export default configureSocket;