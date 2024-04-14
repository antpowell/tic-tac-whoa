import { dbService } from '../services/dbService';

export interface RoomRequest {
  name: string;
  playerId: number;
}

interface PlayerInfo {
  id: string;
  name: string;
  iconText: string;
  playerId: number;
}

export interface ActivePlayers {
  [key: string]: PlayerInfo;
}

export interface RoomData {
  gameRoom: string[];
  waitingRoom: string[];
  activePlayers: ActivePlayers;
  roomFull: boolean;
  nextTurn: 'Player1' | 'Player2';
  roomId?: number;
}

const roomData: RoomData = {
  gameRoom: [],
  waitingRoom: [],
  activePlayers: {} as ActivePlayers,
  roomFull: false,
  nextTurn: 'Player2' //player next up
};

const isRoomFull = () => roomData.gameRoom.length >= 2;

export async function roomCreator({ name, playerId }: RoomRequest) {
  while (isRoomFull() === false && roomData.waitingRoom.length > 0) {
    roomData.gameRoom.push(roomData.waitingRoom.shift()!);
  }

  if (isRoomFull() === true) {
    roomData.waitingRoom.push(name);
    roomData.roomFull = true;
  }

  if (isRoomFull() === false) {
    roomData.activePlayers = {
      ...roomData.activePlayers,
      [name]: {
        id: (roomData.gameRoom.length + 1).toString(),
        name,
        iconText: name.substring(0, 2),
        playerId
      }
    } satisfies ActivePlayers;
    roomData.gameRoom.push(name);
  }

  await createGameRoom(roomData.gameRoom);

  return roomData;
}

const createGameRoom = async (gameRoom: string[]) => {
  if (isRoomFull() === false) return;
  if (roomData.roomId) return;

  if (gameRoom[0] in roomData.activePlayers && gameRoom[1] in roomData.activePlayers) {
    const { data, error } = await dbService().createGame([
      roomData.activePlayers[gameRoom[0]].playerId,
      roomData.activePlayers[gameRoom[1]].playerId
    ]);
    error === null && data !== null ? (roomData.roomId = data[0].id) : null;
  }
  roomData.roomFull = true;
};

export const gameOver = async (winnerId?: number) => {
  const { error } = await dbService().updateGame({
    id: roomData.roomId!,
    data: { ended_at: Date.now(), winner: winnerId ? winnerId : null }
  });

  error === null ? (gameCleanUpProcess(), (roomData.roomId = undefined)) : null;
};

export async function changePlayerTurn(currentTurn: 'Player1' | 'Player2'): Promise<'Player1' | 'Player2'> {
  const nextTurn = currentTurn === 'Player1' ? 'Player2' : 'Player1';
  console.log(`nextTurn: ${nextTurn}`);
  return new Promise(resolve => {
    resolve(nextTurn);
  });
}

export const roomIsEmpty = () => !roomData.roomFull;

export const gameCleanUpProcess = () => {
  roomData.gameRoom = [];
  roomData.roomFull = roomData.gameRoom.length >= 2;
  roomData.activePlayers = {} as ActivePlayers;
  roomData.nextTurn = 'Player2';
};
