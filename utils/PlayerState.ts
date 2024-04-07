import { signal } from "@preact/signals-react";

export interface PlayerState {
  playerName: string;
  score: number;
}

export const PlayerStateSignal = signal<PlayerState>({
  playerName: "",
  score: 0,
});

export const PlayerTurnState = signal<"Player1" | "Player2">("Player1");
