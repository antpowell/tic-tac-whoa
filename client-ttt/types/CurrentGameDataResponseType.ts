export interface CurrentGameDataResponseType {
  event: string;
  data: {
    gameRoom: string[];
    waitingRoom: string[];
    activePlayers: Record<string, { id: string; name: string; iconText: string; playerId: number }>;
    roomFull: boolean;
    nextTurn: 'Player1' | 'Player2';
    roomId: number;
  };
  error?: string;
}
