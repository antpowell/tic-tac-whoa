import { dialogOpen, dialogSignal } from '@/components/organisms/Dialog';
import { findWinner } from './evaluateWinCondition';
import getGameContext from '../state/GameContextState/GameContextState';
import { GameState } from '../state/GameContextState/GameStateTypes';
import { resetGame } from './resetGame';

const { moves, gameStatus } = getGameContext();

export const boardWatcher = () => {
  if (moves.value > 4) {
    console.log(`evaluating game board...`);
    findWinner();
  }
  if (moves.value === 9 && findWinner() === false) {
    dialogSignal.value = {
      description: "It's a draw!",
      open: true,
      title: 'Game Over',
      cancelButtonText: 'Close',
      continueButtonText: 'Play Again',
      onCancel: () => {
        dialogOpen.value = false;
      },
      onContinue: () => {
        resetGame();
      }
    };
    gameStatus.value = GameState.Draw;
  }
};
