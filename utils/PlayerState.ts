import { Signal, signal } from "@preact/signals-react";

export interface PlayerState {
  playerName: Signal<string>;
  score: Signal<number>;
  playerPositions: Signal<number[]>;
  playerTurn: "Player1" | "Player2";
}

export const Player1Signal = signal<PlayerState>({
  playerName: signal(""),
  score: signal(0),
  playerPositions: signal<number[]>([]),
  playerTurn: "Player1",
} satisfies PlayerState);

export const Player2Signal = signal<PlayerState>({
  playerName: signal(""),
  score: signal(0),
  playerPositions: signal<number[]>([]),
  playerTurn: "Player2",
} satisfies PlayerState);

// export const PlayerStateSignal = signal<PlayerState>({
//   playerName: "",
//   score: 0,
//   playerPositions:[]
// });

export const PlayerTurnState = signal<"Player1" | "Player2">("Player1");
