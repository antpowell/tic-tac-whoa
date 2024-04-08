import { Signal, signal } from "@preact/signals-react";
import { GameBoardStateSignal } from "./GameBoardState";
import { Player1Signal, Player2Signal, PlayerState } from "./PlayerState";
import { evaluateWinCondition as hasWinner } from "./GameFunctions/evaluateWinCondition";

export enum GameState {
  Draw = "Draw",
  InProgress = "InProgress",
  GameOver = "GameOver",
}

export const GameStatusSignal = signal<GameState>(GameState.InProgress);

export interface GameContext {
  currentTurn: typeof CurrentTurnStateSignal.value;
  winner: Signal<string>;
  moves: number;
  gameStatus: GameState;
  gameBoard: typeof GameBoardStateSignal;
  players: Array<Signal<PlayerState>>;
}

export const CurrentTurnStateSignal = signal<"Player1" | "Player2">("Player1");

export const boardWatcher = () => {
  if (GameContextSignal.value.moves > 4) {
    console.log(`evaluating game board...`);
    hasWinner();
  }
};

export const GameContextSignal = signal<GameContext>({
  currentTurn: CurrentTurnStateSignal.value,
  moves: 0,
  gameStatus: GameState.InProgress,
  winner: signal<string>(""),
  gameBoard: GameBoardStateSignal,
  players: [Player1Signal, Player2Signal],
});
