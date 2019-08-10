const { io } = require('./server');

// const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED,
// 		LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
// 		TYPING  } = require('../Events')

// const { createUser, sendMessage, createChat } = require('../Factories')

// let connectedUsers = { }

// let communityChat = createChat()

const connections = [];
const connectedUsers = []
let currentChat = {}

module.exports = (socket) => {
  connections.push(socket);
  // socket.userId = "test"
  // console.log(socket)
  console.log(`Connections: ${connections.length}`);

  socket.on('SEND_MESSAGE', data => {
    socket.emit('NEW_MESSAGE', data)
  });

  socket.on("LOGIN_USER", userId => {
    console.log("loggin in ")
    socket.userId = userId
    // console.log(userId)
    // connectedUsers.push()
    // console.log(socket.userId)
    // console.log
  })

  socket.on('JOIN_CHAT_ROOM', chatId => {
    console.log("joining chat room")
    console.log("chatId: " + chatId)
    // const { id } = data
    socket.join(`CHAT_ROOM_${chatId}`)
    console.log(socket.rooms)
  })

  socket.on('UPDATE_CHAT', data => {
    // currentChat = data
    // socket.broadcast.emit('UPDATED_CHAT', data)
    // console.log("currentChat")
    // console.log(currentChat)
    // socket.to(`CHAT_ROOM_${currentChat.id}`).emit(data)
    // socket.to(`CHAT_ROOM_${currentChat.id}`).emit('UPDATED_CHAT', data)
    // socket.emit('UPDATED_CHAT', data)
    socket.broadcast.emit('UPDATED_CHAT', data)
  })

  socket.on('disconnect', (data) => {
    console.log('disconnecting!');
    connections.splice(connections.indexOf(socket), 1);
  });
};
