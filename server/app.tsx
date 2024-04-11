import { createServer } from 'http';
import { Server } from 'socket.io';

const hostname = '127.0.0.1';
const port = 3000;
const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

io.on('connection', socket => {
  console.log('Connection to server established');

  socket.on('searchForRoom', msg => {
    console.log(msg);
  });
});

io.on('disconnect', () => {
  console.log('Connection to server closed');
});

httpServer
  .once('error', err => {
    console.error(err);
    process.exit(1);
  })
  .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
