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

// TOOD: Try Sockets
// io.on('connection', socketManager)