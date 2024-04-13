import { dialogSignal } from '@/components/organisms/Dialog';

import { SquareState } from '../SquareState';
import getGameContext from '../state/GameContextState/GameContextState';
import { GameState } from '../state/GameContextState/GameStateTypes';
import { moveError } from '../Signals/signals';

export const canPlayerMarkBePlaced = (
  square: number,
  player: 'Player1' | 'Player2',
  nextTurn: 'Player1' | 'Player2'
): boolean => {
  if (player === nextTurn) return false;
  const { gameBoard, gameStatus, currentPlayer: currentTurn } = getGameContext();
  const isSquareEmpty = gameBoard.value[square] === SquareState.EMPTY;
  const isGameInProgress = gameStatus.value === GameState.InProgress ? true : false;
  const canPlay = isSquareEmpty && isGameInProgress && moveError.value === '';
  const isActionOfCurrentPlayer = currentTurn.value === player ? true : false;

  if (!isSquareEmpty && isActionOfCurrentPlayer === true) {
    console.log('Cannot click on a filled square');
  }

  if (!isGameInProgress && isActionOfCurrentPlayer === true) {
    console.log('Game over please start a new game');
    return false;
  }

  if (!canPlay && isActionOfCurrentPlayer === true) {
    console.log(`canPlay: ${canPlay}`);
    return false;
  }

  if (isActionOfCurrentPlayer === true) {
    // openDialog
    dialogSignal.value = { ...dialogSignal.value, open: true };
  }

  return isSquareEmpty;
};
