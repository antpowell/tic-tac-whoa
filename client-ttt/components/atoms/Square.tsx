'use client';
import { getSocketService, whoseTurn } from '@/services/socketService';
import getGameContext from '@/utils/GameContextState';
import { canPlayerMarkBePlaced } from '@/utils/GameFunctions/canPlayerMarkBePlaced';
import { updatePlayerPositions } from '@/utils/PlayerState';
import { SquareState } from '@/utils/SquareState';
import { useSignals } from '@preact/signals-react/runtime';

const { gameBoard, gameStatus, boardWatcher, currentPlayer, moves, dialogOpen } = getGameContext();

// const marker = signal((index: number) =>
//   gameBoard.value[index] !== null ? gameBoard.value[index] : SquareState.EMPTY
// );

export const Square = ({ index }: { index: number }) => {
  useSignals();

  const socketService = getSocketService().connect();

  return (
    <div
      className="flex w-1/3 flex-grow items-center justify-center self-stretch border border-neutral-200 text-4xl text-white"
      onClick={_ => {
        if (canPlayerMarkBePlaced(index, currentPlayer.value, whoseTurn.value) === false) return;
        whoseTurn.value = whoseTurn.value === 'Player1' ? 'Player2' : 'Player1';
        socketService.emit('playerMove', { square: index, currentPlayer: currentPlayer, whoseTurn: whoseTurn });
        updatePlayerPositions({ playerPosition: index, playerTurn: currentPlayer.value });
        gameBoard.value = {
          ...gameBoard.value,
          [index]: currentPlayer.value === 'Player1' ? SquareState.X : SquareState.O
        };
        moves.value = moves.value + 1;
        boardWatcher();
      }}>
      {/* {gameBoard[index].value !== null ? gameBoard[index].value : SquareState.EMPTY} */}
      {gameBoard.value[index]}
    </div>
  );
};
