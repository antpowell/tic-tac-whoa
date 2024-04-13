import { mapResponseMessages } from '../utils/mapResponseMessages';

const socket = new WebSocket('ws://localhost:3003');
function socketService() {
  function connect() {
    return socketService();
  }

  socket.onmessage = e => {
    console.log(e.data.toString());
    if (e.data.includes('currentGameData')) {
      mapResponseMessages.currentGameData(JSON.parse(e.data));
    }
    if (e.data.includes('gameFound')) {
      mapResponseMessages.gameFound(JSON.parse(e.data));
    }
    if (e.data.includes('playerMove')) {
      mapResponseMessages.playerMove(JSON.parse(e.data));
    }
    if (e.data.includes('resetGame')) {
      mapResponseMessages.resetGame(JSON.parse(e.data));
    }
  };

  const emit = <T>(event: string, data: T) => {
    const message = JSON.stringify({ event, data });
    socket.send(message);
  };

  const disconnect = () => socket.close();

  return {
    connect,
    emit,
    disconnect
  };
}

export const getSocketService = socketService;
