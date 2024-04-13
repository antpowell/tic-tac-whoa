import { Player1Signal, Player2Signal } from '@/utils/PlayerState';
import { SquareState } from '@/utils/SquareState';
import { signal } from '@preact/signals-react';
import { GameContext, GameState } from './GameStateTypes';

const currentPlayer = signal<'Player1' | 'Player2'>('Player1');
const players = [Player1Signal, Player2Signal];
const moves = signal<number>(0);
const gameBoard = signal(Object.assign({}, Array(9).fill(SquareState.EMPTY)));
const gameStatus = signal<GameState>(GameState.InProgress);
const winner = signal<string>('');
const roomId = signal(0);

const GameContextState = (): GameContext => {
  return {
    currentPlayer,
    players,
    moves,
    gameBoard,
    gameStatus,
    winner,
    roomId
  };
};

const getGameContext = Object.freeze(GameContextState);

export default getGameContext;
