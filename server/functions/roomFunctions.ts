export interface RoomRequest {
  name: string;
}

export interface RoomData {
  gameRoom: string[];
  waitingRoom: string[];
  activePlayers: Record<string, Record<string, string>>;
  roomFull: boolean;
  nextTurn: 'Player1' | 'Player2';
}

const roomData: RoomData = {
  gameRoom: [],
  waitingRoom: [],
  activePlayers: {},
  roomFull: false,
  nextTurn: 'Player2' //next turn
};

export function roomCreator({ name }: RoomRequest) {
  while (!roomData.roomFull && roomData.waitingRoom.length > 0) {
    roomData.gameRoom.push(roomData.waitingRoom.shift()!);
  }
  if (roomData.gameRoom.length < 2) {
    roomData.activePlayers[name] = {
      id: (roomData.gameRoom.length + 1).toString(),
      name,
      iconText: name.substring(0, 2)
    };
    roomData.gameRoom.push(name);
  } else {
    roomData.waitingRoom.push(name);
  }

  roomData.roomFull = roomData.gameRoom.length >= 2;
  return roomData;
}

export async function changePlayerTurn(currentTurn: 'Player1' | 'Player2'): Promise<'Player1' | 'Player2'> {
  const nextTurn = currentTurn === 'Player1' ? 'Player2' : 'Player1';
  console.log(`nextTurn: ${nextTurn}`);
  return new Promise(resolve => {
    resolve(nextTurn);
  });
}

export const roomIsEmpty = () => !roomData.roomFull;

export const gameCleanUpProcess = () => {
  if (roomData.waitingRoom.length > 0 && roomData.gameRoom.length < 2) {
    const nextPlayer = roomData.waitingRoom.shift()!;
    roomData.gameRoom.push(nextPlayer);
    roomData.activePlayers = {
      ...roomData.activePlayers,
      [nextPlayer]: {
        id: (roomData.gameRoom.length + 1).toString(),
        name: nextPlayer,
        iconText: nextPlayer.substring(0, 2)
      }
    };
  } else {
    roomData.gameRoom = [];
    roomData.roomFull = roomData.gameRoom.length >= 2;
    roomData.activePlayers = {};
    roomData.nextTurn = 'Player2';
  }
};
