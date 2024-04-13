import { signal } from '@preact/signals-react';

import { GameState } from '../state/GameContextState/GameStateTypes';
import { SquareState } from '../SquareState';

export const GameStatusSignal = signal<GameState>(GameState.InProgress);

export const playersMark = signal<SquareState>(SquareState.EMPTY);

export const moveError = signal<string>('');

export const nextTurn = signal<'Player1' | 'Player2'>('Player1');

export const playerNameInput = signal<string>('');
export const playersInBattle = signal<Record<string, { id: string; name: string; iconText: string }>>({});
export const isRoomFull = signal<boolean>(false);
