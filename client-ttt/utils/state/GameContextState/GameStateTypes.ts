import { PlayerState } from '@/utils/PlayerState';
import { SquareState } from '@/utils/SquareState';
import { Signal } from '@preact/signals-react';

export enum GameState {
  Draw = 'Draw',
  InProgress = 'InProgress',
  GameOver = 'GameOver'
}
export interface GameContext {
  currentPlayer: Signal<'Player1' | 'Player2'>;
  winner: Signal<string>;
  moves: Signal<number>;
  gameStatus: Signal<GameState>;
  gameBoard: Signal<Record<number, SquareState>>;
  players: Array<Signal<PlayerState>>;
  roomId: Signal<number>;
}
