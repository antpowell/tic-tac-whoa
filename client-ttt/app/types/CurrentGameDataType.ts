export interface CurrentGameDataResponseType {
  event: string;
  data: {
    gameRoom: string[];
    activePlayers: Record<string, { id: string; name: string; iconText: string }>;
    roomFull: boolean;
    waitingRoom: string[];
    whoseTurn: 'Player1' | 'Player2';
  };
  error?: string;
}
