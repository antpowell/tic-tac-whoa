'use client';

import getGameContext from '@/utils/state/GameContextState/GameContextState';
import { canPlayerMarkBePlaced } from '@/utils/GameFunctions/canPlayerMarkBePlaced';
import { updatePlayerPositions } from '@/utils/PlayerState';
import { SquareState } from '@/utils/SquareState';
import { useSignals } from '@preact/signals-react/runtime';
import { boardWatcher } from '@/utils/GameFunctions/boardWatcher';
import { getSocketService } from '@/services/socketService';
import { nextTurn } from '@/utils/Signals/signals';

const { gameBoard, currentPlayer, moves } = getGameContext();

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
        if (canPlayerMarkBePlaced(index, currentPlayer.value, nextTurn.value) === false) return;
        nextTurn.value = nextTurn.value === 'Player1' ? 'Player2' : 'Player1';
        socketService.emit('playerMove', { square: index, currentPlayer: currentPlayer, whoseTurn: nextTurn });
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
