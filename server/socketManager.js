const { io } = require('./server');

// const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED,
// 		LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
// 		TYPING  } = require('../Events')

// const { createUser, sendMessage, createChat } = require('../Factories')

// let connectedUsers = { }

// let communityChat = createChat()

const connections = [];
let currentChat = {}

module.exports = (socket) => {
  connections.push(socket);
  console.log(`Connections: ${connections.length}`);

  socket.on('SEND_MESSAGE', data => {
    socket.emit('NEW_MESSAGE', data)
  });

  socket.on('UPDATE_CHAT', data => {
    // console.log("data")
    // console.log(data)
    currentChat = data
    // console.log("Update Chat")
    // console.log("messages")
    // console.log(messages)
    socket.broadcast.emit('UPDATED_CHAT', data)
  })

  socket.on('disconnect', (data) => {
    console.log('disconnecting!');
    connections.splice(connections.indexOf(socket), 1);
  });
};
