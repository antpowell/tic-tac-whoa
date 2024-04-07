import { Signal, signal } from "@preact/signals-react";
import { SquareState } from "./SquareState";
import { GameBoardStateSignal } from "./GameBoardState";

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
}

export const CurrentTurnStateSignal = signal<"Player1" | "Player2">("Player1");

export const SwapTurns = () => {
  console.log(
    `Changing turn to ${CurrentTurnStateSignal.value === "Player1" ? "Player2" : "Player1"}`,
  );
  CurrentTurnStateSignal.value =
    CurrentTurnStateSignal.value === "Player1" ? "Player2" : "Player1";
};

export const GameContextSignal = signal<GameContext>({
  currentTurn: CurrentTurnStateSignal.value,
  moves: 0,
  gameStatus: GameState.InProgress,
  winner: signal<string>(""),
});

const winningConditions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [3, 4, 5],
  [2, 5, 8],
  [1, 4, 7],
  [6, 7, 8],
  [2, 4, 6],
];
