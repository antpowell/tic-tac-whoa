import { computed } from '@preact/signals-react';
import { Player1Signal, Player2Signal } from '../PlayerState';
import getGameContext from '../state/GameContextState/GameContextState';
import { handleWinState } from './handleWinState';

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

const { currentPlayer: currentPlayer } = getGameContext();

export const findWinner = () => {
  console.log('evaluating win condition...');

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
    if (winner) handleWinState(winner);
  });

  return foundWinner;
};
