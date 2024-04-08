import { signal } from "@preact/signals-react";
import { SquareState } from "./SquareState";

export const GameBoardStateSignal = signal<SquareState[]>(Array(9).fill(null));
