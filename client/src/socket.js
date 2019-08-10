import io from 'socket.io-client';

const socketUrl = "http://localhost:5000"
const socket = io(socketUrl);

const configureSocket = (dispatch, getState) => {
  // make sure our socket is connected to the port
  socket.on('connect', () => {
    console.log(`SocketIO connected at ${socketUrl}`);
    // console.log(getState().auth.currentUser)
    socket.emit('LOGIN_USER', getState().auth.currentUser.id)
  });

  // the socket.on method is like an event listener
  // just like how our redux reducer works
  // the different actions that our socket/client will emit
  // is catched by these listeners
  socket.on('UPDATED_CHAT', data => {
    dispatch({ type: 'DELIVER_UPDATED_CHAT_TO_REDUCER', payload: data });
  });

  return socket;
};

export default configureSocket;