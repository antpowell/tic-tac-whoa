'use client';

import { Square } from '@/components/atoms/Square';
import { getSocketService } from '@/services/socketService';
import getGameContext from '@/utils/GameContextState';
import { SquareState } from '@/utils/SquareState';
import { useSignals } from '@preact/signals-react/runtime';

const { gameBoard, gameStatus, boardWatcher, currentPlayer: currentTurn, moves, dialogOpen } = getGameContext();

// sendPlayerPositionsToServer({ playerPosition: index });

export const GameBoard = () => {
  useSignals();

  const socketService = getSocketService().connect();

  // socketService.on('playerMove', (data: PlayerMoveResponseType) => {
  //   console.log(`player move in square: ${JSON.stringify(data, null, 2)}`);
  //   // if (data.data.square !== index) return;
  //   if (data.data.currentPlayer !== currentTurn.value) return;
  //   if (gameStatus.value !== GameState.InProgress) return;

  //   gameBoard.value[data.data.square] = data.data.currentPlayer === 'Player1' ? SquareState.X : SquareState.O;
  // });

  // RoomSocket.value.onopen = event => {
  //   console.log('connection to server established');
  //   console.log(JSON.stringify(event, null, 2));
  // };

  // const socket = getSocketService().connect();

  // socket.on<PlayerMoveResponseType>('playerMove', response => {
  //   console.log(`player move received from server`, JSON.stringify(response.data, null, 2));
  //   if (response.data.currentPlayer !== currentTurn.value) return;
  //   if (canPlayerMarkBePlaced(response.data.square) === false) return;
  //   if (gameStatus.value !== GameState.InProgress) return;

  //   updatePlayerPositions({
  //     playerPosition: response.data.square,
  //     playerTurn: response.data.currentPlayer
  //   });

  //   // playersMark.value = currentTurn.value === 'Player1' ? SquareState.X : SquareState.O;
  //   // gameBoard.value[response.data.square] = playersMark.value;

  //   moves.value = moves.value + 1;
  //   boardWatcher();
  // });

  // RoomSocket.value.onmessage = event => {
  //   console.log('got message in game board', event.data);
  //   if (event.data.includes('playerMove')) {
  //     console.log('player move received from server', JSON.stringify(event.data));
  //     const response = JSON.parse(event.data) as PlayerMoveResponseType;

  //     if (response.data.currentPlayer === currentTurn.value) {
  //       if (canPlayerMarkBePlaced(response.data.square) !== false) {
  //         if (gameStatus.value === GameState.InProgress) {
  //           updatePlayerPositions({
  //             playerPosition: response.data.square,
  //             playerTurn: response.data.currentPlayer
  //           });

  //           playersMark.value = currentTurn.value === 'Player1' ? SquareState.X : SquareState.O;
  //           gameBoard.value[response.data.square] = playersMark.value;

  //           moves.value = moves.value + 1;
  //           boardWatcher();
  //         }
  //       }
  //     }
  //   }
  // };

  const createGameBoard = () => {
    const elements: [string, SquareState][] = [];
    Object.entries(gameBoard.value).forEach(key => {
      elements.push(key);
    });
    return elements;
  };

  return (
    // <div className="flex h-[800px] min-h-[600px] w-[800px] flex-wrap items-stretch ">
    <div className="flex h-[600px] w-[600px] flex-wrap ">
      {createGameBoard().map((_, index) => (
        <Square
          key={index}
          index={index}
          // onClick={playersMark => {
          //   console.log(`Square ${index} clicked by ${currentTurn.value}`);
          // }}
        />
      ))}
    </div>
  );
};
