import io from 'socket.io-client';
import {
  DELIVER_CREATED_CHAT_TO_ONLINE_CLIENTS,
  DELIVER_MESSAGE_TO_ONLINE_CLIENTS,
} from './constants/actionTypes';
import {
  RECEIVED_MESSAGE,
  CREATED_CHAT,
} from './constants/socketEventTypes';

// const SERVER_URL = "http://localhost:5000"
const SERVER_URL = "https://chat-app-daniel-pan.herokuapp.com"
const socket = io(SERVER_URL);

const configureSocket = (dispatch, getState) => {
  socket.on('connect', () => {
    if (getState().auth.isLoggedIn) {
      socket.emit('SET_ONLINE_USER', getState().auth.currentUser);
    }
  });

  socket.on(CREATED_CHAT, (data) => {
    dispatch({ type: DELIVER_CREATED_CHAT_TO_ONLINE_CLIENTS, payload: data });
  });

  socket.on(RECEIVED_MESSAGE, (data) => {
    dispatch({ type: DELIVER_MESSAGE_TO_ONLINE_CLIENTS, payload: data });
  });

  socket.on('RECEIVED_ONLINE_USERS', (data) => {
    dispatch({ type: 'DELIVER_ONLINE_USERS_TO_ONLINE_CLIENTS', payload: data });
  });

  return socket;
};

export default configureSocket;
