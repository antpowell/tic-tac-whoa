import { Signal, signal } from '@preact/signals-react';

export interface PlayerState {
  playerName: Signal<string>;
  score: Signal<number>;
  playerPositions: Signal<number[]>;
  playerTurn: 'Player1' | 'Player2';
  playerId: Signal<number>;
  inGameId: Signal<string>;
}

export const Player1Signal = signal<PlayerState>({
  playerName: signal(''),
  score: signal(0),
  playerPositions: signal<number[]>([]),
  playerTurn: 'Player1',
  playerId: signal(0),
  inGameId: signal('')
} satisfies PlayerState);

export const Player2Signal = signal<PlayerState>({
  playerName: signal(''),
  score: signal(0),
  playerPositions: signal<number[]>([]),
  playerTurn: 'Player2',
  playerId: signal(0),
  inGameId: signal('')
} satisfies PlayerState);

export const updatePlayerPositions = ({
  playerPosition,
  playerTurn
}: {
  playerPosition: number;
  playerTurn: 'Player1' | 'Player2';
}) => {
  playerTurn === 'Player1'
    ? Player1Signal.value.playerPositions.value.push(playerPosition)
    : Player2Signal.value.playerPositions.value.push(playerPosition);
};

export const PlayerTurnState = signal<'Player1' | 'Player2'>('Player1');
