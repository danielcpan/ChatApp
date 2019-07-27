const app = require('./app');
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { PORT, PUBLIC_URL } = require('./config/config');

server.listen(PORT, () => {
  console.info(`Server started on ${PUBLIC_URL}`); // eslint-disable-line no-console
});

io.on('connection', socket => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', data => {
    console.log(data);
  });
});
