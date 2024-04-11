import { dialogSignal } from '@/components/organisms/Dialog';
import { getSocketService } from '@/services/socketService';
import { Signal, computed } from '@preact/signals-react';
import getGameContext, { GameState } from '../GameContextState';
import { Player1Signal, Player2Signal } from '../PlayerState';

const didPlayerWin = (winningArr: Array<number>, playerPositions: Array<number>) => {
  let whoWon: 'Player1' | 'Player2' | null = null;
  whoWon = winningArr.every(element => Player1Signal.value.playerPositions.value.includes(element))
    ? 'Player1'
    : whoWon;
  whoWon = winningArr.every(element => Player2Signal.value.playerPositions.value.includes(element))
    ? 'Player2'
    : whoWon;

  return whoWon;
};

export const findWinner = (
  {
    // currentPlayer,
    // gameStatus,
    // dialogOpen
  }: {
    currentPlayer: Signal<'Player1' | 'Player2'>;
    gameStatus: Signal<GameState>;
    dialogOpen: Signal<boolean>;
  }
) => {
  const { currentPlayer: currentPlayer, gameStatus, dialogOpen, resetGame } = getGameContext();
  console.log('evaluating win condition...');

  const socketService = getSocketService().connect();

  let foundWinner = false;

  const winningConditions = new Set([
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [2, 5, 8],
    [1, 4, 7],
    [6, 7, 8],
    [2, 4, 6]
  ]);

  let playerPositions = computed(() => {
    return currentPlayer.value === 'Player1'
      ? Player1Signal.value.playerPositions.peek()
      : Player2Signal.value.playerPositions.peek();
  });

  console.log(`currentPlayer: ${currentPlayer.value}`);
  console.log(`playerPositions: ${playerPositions}`);

  winningConditions.forEach(winningSet => {
    const winner = didPlayerWin(winningSet, playerPositions.value);
    if (winner) {
      const title = `${winner} Wins!`;
      const description = winner === currentPlayer.value ? 'Nice Job!' : 'Better luck next time!';
      console.log(title);
      console.log(description);
      dialogSignal.value = {
        ...dialogSignal.value,
        title: title,
        description: description,
        open: true,
        cancelButtonText: 'Close',
        continueButtonText: 'Play Again',
        onCancel: () => {
          dialogOpen.value = false;
        },
        onContinue: () => {
          socketService.emit('resetGame', {});
          resetGame();
        }
      };

      gameStatus.value = GameState.GameOver;
      foundWinner = true;
      dialogOpen.value = true;
    }
  });

  return foundWinner;
};
