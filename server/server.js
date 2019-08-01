// const server = require('http').Server(app);
const http = require('http');
const app = require('./app');

const server = http.Server(app);
const io = module.exports.io = require('socket.io')(server); // eslint-disable-line import/order

const socketManager = require('./socketManager');
const { PORT, PUBLIC_URL } = require('./config/config');

server.listen(PORT, () => {
  console.info(`Server started on ${PUBLIC_URL}`); // eslint-disable-line no-console
});

io.on('connection', socketManager)

// const connections = []


// io.on('connection', (socket) => {
//   connections.push(socket);
//   console.log(`Connections: ${connections.length}`)
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', (data) => {
//     console.log(data); // eslint-disable-line no-console
//   });

//   socket.on('disconnect', (data) => {
//     console.log("disconnecting!")
//     connections.splice(connections.indexOf(socket), 1);
//   })
// });
