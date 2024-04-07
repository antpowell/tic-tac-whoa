import { Signal, computed, signal } from "@preact/signals-react";
import { SquareState, SquareStateSignal } from "./SquareState";
import { PlayerState } from "./PlayerState";

export const GameBoardState = signal({
  1: signal(SquareState.EMPTY),
  2: signal(SquareState.EMPTY),
  3: signal(SquareState.EMPTY),
  4: signal(SquareState.EMPTY),
  5: signal(SquareState.EMPTY),
  6: signal(SquareState.EMPTY),
  7: signal(SquareState.EMPTY),
  8: signal(SquareState.EMPTY),
  9: signal(SquareState.EMPTY),
});

// export const updateGameBoardState = (
//   index: number,
//   player: typeof CurrentTurnStateSignal.value,
// ) => {
//   GameBoardStateSignal.value[index].value =
//     player === "Player1" ? SquareState.X : SquareState.O;
// };

export const GameBoardStateSignal = signal<Signal<SquareState>[]>(
  Array(9).fill(SquareState.EMPTY),
);
