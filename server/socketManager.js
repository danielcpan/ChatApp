const {
  JOIN_CHAT,
  REGISTER_SOCKET_USER_ID,
  SEND_MESSAGE,
  RECEIVED_MESSAGE,
  CREATED_CHAT,
  CREATE_CHAT
} = require('./constants/socketEventTypes')

const connections = [];

module.exports = (socket) => {
  connections.push(socket);
  console.log(`Connections: ${connections.length}`);

  socket.on(SEND_MESSAGE, data => {
    socket.to(`CHAT_ROOM_${data.chatId}`).emit(RECEIVED_MESSAGE, data)
  });

  socket.on(REGISTER_SOCKET_USER_ID, userId => {
    socket.userId = userId
  })

  socket.on(CREATE_CHAT, data => {
    socket.broadcast.emit(CREATED_CHAT, data)
  })

  socket.on(JOIN_CHAT, async chatId => {
    socket.leaveAll()
    await socket.join(`CHAT_ROOM_${chatId}`)
  })

  socket.on('disconnect', data => {
    console.log('disconnecting!');
    connections.splice(connections.indexOf(socket), 1);
  });
};
