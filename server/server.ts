// import { app, ws } from './app';

// Bun.serve({
//   fetch: app.fetch,
//   websocket: ws,
//   port: 8080
// });
import { serve } from 'bun';
import { createServer } from 'http';
import { changePlayerTurn, gameCleanUpProcess, roomCreator, type RoomData } from './functions/roomFunctions';

const hostname = 'localhost';
const port = 3003;

const httpServer = createServer();

let roomData: RoomData = {
  gameRoom: [],
  waitingRoom: [],
  activePlayers: {},
  roomFull: false,
  nextTurn: 'Player1'
};

const server = serve({
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // do not return a Response
    }
    return new Response('Server upgrade failed :(', { status: 500 });
  },
  websocket: {
    async message(ws, message) {
      // ws.send('Server Received: ' + message);
      const { event, data } = await new Response(message).json();

      console.log(`event === 'searchForRoom': ${event === 'searchForRoom'}`);

      if (event === 'searchForRoom') {
        // ws.send('Searching for room...');
        roomData = await roomCreator({ name: data.name });

        console.log(`roomData: ${JSON.stringify(roomData, null, 2)}`);

        ws.send(JSON.stringify({ event: 'currentGameData', data: roomData }));

        if (roomData.gameRoom.includes(data.name)) {
          // ws.send('Game Found');

          ws.send(JSON.stringify({ event: 'gameFound', data: roomData }));
        } else if (roomData.waitingRoom.includes(data.name)) {
          // ws.send.publish('gameFound', { gameId: waitingRoom[0], playerId: data.name });
        } else {
          // server.publish('gameSearch', 'Searching for a room on our side...');
        }
        ws.publish('gameCommunication', JSON.stringify({ event: 'currentGameData', data: roomData, error: null }));
      }

      if (event === 'playerMove') {
        console.log(`event === 'playerMove': ${event === 'playerMove'}`);
        console.log(JSON.stringify(data, null, 2));

        if (data.currentPlayer === roomData.nextTurn) {
          ws.send(JSON.stringify({ event: 'currentGameData', data: roomData, error: 'It is not your turn' }));
          return;
        }

        ws.publish(
          'gameCommunication',
          JSON.stringify({
            event: 'playerMove',
            data: { currentPlayer: data.currentPlayer, square: data.square, whoseTurn: roomData.nextTurn }
          })
        );
        if (data.currentPlayer !== roomData.nextTurn) {
          roomData.nextTurn = await changePlayerTurn(roomData.nextTurn);
        }
        console.log(roomData.nextTurn);
      }

      if (event === 'resetGame') {
        gameCleanUpProcess();
        roomData = { ...roomData, gameRoom: [], activePlayers: {}, roomFull: false, nextTurn: 'Player2' };

        ws.send(JSON.stringify({ event: 'currentGameData', data: roomData, error: null }));
        ws.publish('gameCommunication', JSON.stringify({ event: 'resetGame', data: {} }));
        ws.publish('gameCommunication', JSON.stringify({ event: 'currentGameData', data: roomData, error: null }));
      }
    },
    async open(ws) {
      console.log('Connection to client established');
      ws.subscribe('gameCommunication');
      ws.send(JSON.stringify({ event: 'connected', data: { message: 'Connected to server' } }));

      ws.send(JSON.stringify({ event: 'currentGameData', data: roomData }));
    },
    async close(ws) {
      ws.unsubscribe('gameCommunication');
      console.log('Connection to client closed');
    }
  },
  port: 3003
});

console.log(`Listening on ${server.hostname}:${server.port}`);
