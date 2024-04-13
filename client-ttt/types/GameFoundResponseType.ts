export interface GameFoundResponseType {
  event: string;
  data: RoomData;
}

export interface RoomData {
  gameRoom: string[];
  waitingRoom: string[];
  activePlayers: Record<string, { id: string; name: string; iconText: string; playerId: number }>;
  roomFull: boolean;
  roomId: number;
}
