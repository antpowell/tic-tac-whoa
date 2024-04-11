import { Signal, signal } from '@preact/signals-react';
import { findWinner } from './GameFunctions/evaluateWinCondition';
import { Player1Signal, Player2Signal, PlayerState } from './PlayerState';
import { SquareState } from './SquareState';
import { dialogSignal } from '@/components/organisms/Dialog';

export enum GameState {
  Draw = 'Draw',
  InProgress = 'InProgress',
  GameOver = 'GameOver'
}

export const GameStatusSignal = signal<GameState>(GameState.InProgress);

export interface GameContext {
  currentPlayer: Signal<'Player1' | 'Player2'>;
  winner: Signal<string>;
  moves: Signal<number>;
  gameStatus: Signal<GameState>;
  gameBoard: Signal<Record<number, SquareState>>;
  players: Array<Signal<PlayerState>>;
  dialogOpen: Signal<boolean>;
  boardWatcher: () => void;
  resetGame: () => void;
}
const currentPlayer = signal<'Player1' | 'Player2'>('Player1');
const players = [Player1Signal, Player2Signal];
const moves = signal<number>(0);
const gameBoard = signal(Object.assign({}, Array(9).fill(SquareState.EMPTY)));
const gameStatus = signal<GameState>(GameState.InProgress);
const winner = signal<string>('');
const dialogOpen = signal<boolean>(false);

const GameContextState = (): GameContext => {
  const boardWatcher = () => {
    if (moves.value > 4) {
      console.log(`evaluating game board...`);
      findWinner({ currentPlayer, gameStatus, dialogOpen });
    }
    if (moves.value === 9 && findWinner({ currentPlayer, gameStatus, dialogOpen }) === false) {
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

  const resetGame = () => {
    currentPlayer.value = 'Player1';
    moves.value = 0;
    gameStatus.value = GameState.InProgress;
    winner.value = '';
    gameBoard.value = Object.assign({}, Array(9).fill(SquareState.EMPTY));
    Player1Signal.value = {
      playerName: signal(''),
      score: signal(0),
      playerPositions: signal<number[]>([]),
      playerTurn: 'Player1'
    };
    Player2Signal.value = {
      playerName: signal(''),
      score: signal(0),
      playerPositions: signal<number[]>([]),
      playerTurn: 'Player2'
    };
  };

  return {
    currentPlayer,
    players,
    moves,
    gameBoard,
    gameStatus,
    winner,
    dialogOpen,
    boardWatcher,
    resetGame
  };
};

const getGameContext = Object.freeze(GameContextState);

export default getGameContext;
