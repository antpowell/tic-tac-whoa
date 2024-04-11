import { signal } from "@preact/signals-react";

export enum SquareState {
  X = "X",
  O = "O",
  EMPTY = "EMPTY",
}

export const SquareStateSignal = signal<SquareState>(SquareState.EMPTY);
