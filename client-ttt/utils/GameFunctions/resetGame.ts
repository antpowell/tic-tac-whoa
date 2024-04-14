import { signal } from '@preact/signals-react';
import { Player1Signal, Player2Signal } from '../PlayerState';
import { SquareState } from '../SquareState';
import getGameContext from '../state/GameContextState/GameContextState';
import { GameState } from '../state/GameContextState/GameStateTypes';

const { currentPlayer, gameBoard, gameStatus, moves, winner } = getGameContext();

export const resetGame = () => {
  currentPlayer.value = 'Player1';
  moves.value = 0;
  gameStatus.value = GameState.InProgress;
  winner.value = '';
  gameBoard.value = Object.assign({}, Array(9).fill(SquareState.EMPTY));
  Player1Signal.value = {
    playerName: signal(''),
    score: signal(0),
    playerPositions: signal<number[]>([]),
    playerTurn: 'Player1',
    playerId: signal(0),
    inGameId: signal('')
  };
  Player2Signal.value = {
    playerName: signal(''),
    score: signal(0),
    playerPositions: signal<number[]>([]),
    playerTurn: 'Player2',
    playerId: signal(0),
    inGameId: signal('')
  };
};
