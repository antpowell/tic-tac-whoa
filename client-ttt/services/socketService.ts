import { CurrentGameDataResponseType } from '@/app/types/CurrentGameDataType';
import { GameFoundResponseType } from '@/app/types/GameFoundResponseType';
import { PlayerMoveResponseType } from '@/app/types/PlayerMoveResponseType';
import { isRoomFull, playerNameInput, playersInBattle } from '@/components/organisms/GameSearchSideBar';
import getGameContext, { GameState } from '@/utils/GameContextState';
import { canPlayerMarkBePlaced } from '@/utils/GameFunctions/canPlayerMarkBePlaced';
import { updatePlayerPositions } from '@/utils/PlayerState';
import { SquareState } from '@/utils/SquareState';
import { signal } from '@preact/signals-react';

const { currentPlayer, gameBoard, gameStatus, boardWatcher, moves, resetGame } = getGameContext();

export const playersMark = signal<SquareState>(SquareState.EMPTY);

export const moveError = signal<string>('');

export const whoseTurn = signal<'Player1' | 'Player2'>('Player1');

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
      mapResponseMessages.resetGame();
    }
  };

  const emit = <T>(event: string, data: T) => {
    const message = JSON.stringify({ event, data });
    socket.send(message);
  };

  const disconnect = () => socket.close();

  return {
    connect,
    // on,
    emit,
    disconnect
  };
}

export const getSocketService = socketService;

interface ResponseMessageMapper {
  [key: string]: (data: any) => any;
}

interface ResponseMessageTypeMapper {
  currentGameData: (data: CurrentGameDataResponseType) => void;
  gameFound: (data: GameFoundResponseType) => void;
  playerMove: (data: PlayerMoveResponseType) => void;
  resetGame: () => void;
}

const mapResponseMessages: ResponseMessageTypeMapper = {
  currentGameData: (data: CurrentGameDataResponseType) => {
    if (data.error) {
      moveError.value = data.error;
      return;
    }

    isRoomFull.value = data.data.roomFull;
    whoseTurn.value = data.data.whoseTurn;

    playersInBattle.value = data.data.activePlayers;
    if (!data.data.gameRoom.includes(playerNameInput.peek())) return;
    currentPlayer.value = data.data.activePlayers[playerNameInput.peek()].id === '1' ? 'Player1' : 'Player2';
    console.log(
      !data.data.roomFull && data.data.gameRoom.length < 2
        ? 'Match Found! Waiting on opponents...'
        : !data.data.roomFull
          ? 'Match Found! Your in! Good luck!'
          : 'Room is full! Please wait in the waiting room...'
    );

    console.log(
      `Welcome ${playerNameInput.peek()}, you are player ${data.data.activePlayers[playerNameInput.peek()].id}!`
    );
  },
  gameFound: (data: GameFoundResponseType) => {
    isRoomFull.value = data.data.roomFull;

    playersInBattle.value = data.data.activePlayers;
    if (!data.data.gameRoom.includes(playerNameInput.peek())) return;
    currentPlayer.value = data.data.activePlayers[playerNameInput.peek()].id === '1' ? 'Player1' : 'Player2';
    console.log(
      !data.data.roomFull && data.data.gameRoom.length < 2
        ? 'Match Found! Waiting on opponents...'
        : !data.data.roomFull
          ? 'Match Found! Your in! Good luck!'
          : 'Room is full! Please wait in the waiting room...'
    );

    console.log(
      `Welcome ${playerNameInput.peek()}, you are player ${data.data.activePlayers[playerNameInput.peek()].id}!`
    );
  },
  playerMove: (data: PlayerMoveResponseType) => {
    console.log(`player move received from server`, JSON.stringify(data.data, null, 2));
    // if (data.data.currentPlayer === currentPlayer.value) return;
    if (canPlayerMarkBePlaced(data.data.square, data.data.currentPlayer, data.data.whoseTurn) === false) return;
    if (gameStatus.value !== GameState.InProgress) return;

    whoseTurn.value = whoseTurn.value === 'Player1' ? 'Player2' : 'Player1';

    updatePlayerPositions({
      playerPosition: data.data.square,
      playerTurn: data.data.currentPlayer
    });

    gameBoard.value = {
      ...gameBoard.value,
      [data.data.square]: data.data.currentPlayer === 'Player1' ? SquareState.X : SquareState.O
    };

    moves.value = moves.value + 1;
    boardWatcher();
  },
  resetGame: () => {
    resetGame();
  }
};
