const {
  JOIN_CHAT,
  SET_ONLINE_USER,
  SET_OFFLINE_USER,
  RECEIVED_ONLINE_USERS,
  SEND_MESSAGE,
  RECEIVED_MESSAGE,
  CREATED_CHAT,
  CREATE_CHAT,
} = require('./constants/socketEventTypes');

const { io } = require('./server');

const connections = [];
const onlineUsers = [];

const setOfflineUser = (socket) => {
  const onlineUserIndex = onlineUsers.map(user => user.id).indexOf(socket.userId);

  onlineUsers.splice(onlineUserIndex, 1);
};

module.exports = (socket) => {
  connections.push(socket);
  console.log(`Connections: ${connections.length}`); // eslint-disable-line no-console

  socket.on(SEND_MESSAGE, (data) => {
    socket.to(`CHAT_ROOM_${data.chatId}`).emit(RECEIVED_MESSAGE, data);
  });

  socket.on(SET_ONLINE_USER, (data) => {
    socket.userId = data.id; // eslint-disable-line no-param-reassign
    onlineUsers.push(data); // eslint-disable-line no-unused-vars
    console.log('Online Users: '); // eslint-disable-line no-console
    console.log(onlineUsers); // eslint-disable-line no-console
    io.emit(RECEIVED_ONLINE_USERS, onlineUsers);
  });

  socket.on(SET_OFFLINE_USER, () => {
    setOfflineUser(socket);
    io.emit(RECEIVED_ONLINE_USERS, onlineUsers);
  });

  socket.on(CREATE_CHAT, (data) => {
    socket.broadcast.emit(CREATED_CHAT, data);
  });

  socket.on(JOIN_CHAT, async (chatId) => {
    socket.leaveAll();
    await socket.join(`CHAT_ROOM_${chatId}`);
  });

  socket.on('disconnect', () => {
    console.log('DISCONNECTING!'); // eslint-disable-line no-console
    connections.splice(connections.indexOf(socket), 1);
    if (socket.userId) {
      setOfflineUser(socket);
    }

    io.emit(RECEIVED_ONLINE_USERS, onlineUsers);
  });
};
