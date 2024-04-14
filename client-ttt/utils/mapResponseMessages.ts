import { CurrentGameDataResponseType } from '@/types/CurrentGameDataResponseType';
import { GameFoundResponseType } from '@/types/GameFoundResponseType';
import { PlayerMoveResponseType } from '@/types/PlayerMoveResponseType';

import { GameState } from '@/utils/state/GameContextState/GameStateTypes';
import { canPlayerMarkBePlaced } from '@/utils/GameFunctions/canPlayerMarkBePlaced';
import getGameContext from '@/utils/state/GameContextState/GameContextState';
import { SquareState } from '@/utils/SquareState';
import { Player1Signal, Player2Signal, updatePlayerPositions } from '@/utils/PlayerState';
import { isRoomFull, moveError, playerNameInput, playersInBattle, nextTurn } from './Signals/signals';
import { boardWatcher } from './GameFunctions/boardWatcher';
import { resetGame } from './GameFunctions/resetGame';
import { EndGameDataType } from '@/types/EndGameDataType';

interface ResponseMessageTypeMapper {
  currentGameData: (data: CurrentGameDataResponseType) => void;
  gameFound: (data: GameFoundResponseType) => void;
  playerMove: (data: PlayerMoveResponseType) => void;
  resetGame: (data: EndGameDataType) => void;
}

const { currentPlayer, gameBoard, gameStatus, moves, roomId } = getGameContext();

export const mapResponseMessages: ResponseMessageTypeMapper = {
  currentGameData: (data: CurrentGameDataResponseType) => {
    if (data.error) {
      moveError.value = data.error;
      return;
    }

    isRoomFull.value = data.data.roomFull;
    nextTurn.value = data.data.nextTurn;

    if (isRoomFull.value === true) {
      console.log(JSON.stringify(Player1Signal.value, null, 2));
      console.log(JSON.stringify(Player1Signal.value, null, 2));
      Player1Signal.value.inGameId.value = data.data.activePlayers[Player1Signal.value.playerName.peek()].id;
      Player2Signal.value.playerName.value = data.data.gameRoom.filter(
        name => name !== Player1Signal.value.playerName.peek()
      )[0];
      Player2Signal.value.inGameId.value = data.data.activePlayers[Player2Signal.value.playerName.peek()].id;
      Player2Signal.value.playerId.value = data.data.activePlayers[Player2Signal.value.playerName.peek()].playerId;

      playersInBattle.value = data.data.activePlayers;
      if (!data.data.gameRoom.includes(Player1Signal.value.playerName.peek())) return;
      currentPlayer.value =
        data.data.activePlayers[Player1Signal.value.playerName.peek()].id === '1' ? 'Player1' : 'Player2';
      Player1Signal.value.playerId.value = data.data.activePlayers[Player1Signal.value.playerName.peek()].playerId;
    }

    playersInBattle.value = data.data.activePlayers;
    if (!data.data.gameRoom.includes(Player1Signal.value.playerName.peek())) return;
    console.log(`playername ${Player1Signal.value.playerName.peek()}`);
    currentPlayer.value =
      data.data.activePlayers[Player1Signal.value.playerName.peek()].id === '1' ? 'Player1' : 'Player2';
    console.log(
      !data.data.roomFull && data.data.gameRoom.length < 2
        ? 'Match Found! Waiting on opponents...'
        : !data.data.roomFull
          ? 'Match Found! Your in! Good luck!'
          : 'Room is full! Please wait in the waiting room...'
    );

    console.log(
      `Welcome ${Player1Signal.value.playerName.peek()}, you are player ${data.data.activePlayers[Player1Signal.value.playerName.peek()].id}!`
    );
  },
  gameFound: (data: GameFoundResponseType) => {
    isRoomFull.value = data.data.roomFull;
    roomId.value = data.data.roomId;

    if (data.data.roomFull === false && data.data.gameRoom.length < 2) {
      console.log('Match Found! Waiting on opponents...');
      return;
    }

    if (data.data.gameRoom.length !== 2) return;

    console.log(`Match Found! Your in! Good luck!`);

    console.log(
      `Welcome ${Player1Signal.value.playerName.peek()}, you are player ${data.data.activePlayers[Player1Signal.value.playerName.peek()].id}!`
    );
  },
  playerMove: (data: PlayerMoveResponseType) => {
    console.log(`player move received from server`, JSON.stringify(data.data, null, 2));
    // if (data.data.currentPlayer === currentPlayer.value) return;
    if (canPlayerMarkBePlaced(data.data.square, data.data.currentPlayer, data.data.whoseTurn) === false) return;
    if (gameStatus.value !== GameState.InProgress) return;

    nextTurn.value = nextTurn.value === 'Player1' ? 'Player2' : 'Player1';

    updatePlayerPositions({
      playerPosition: data.data.square,
      playerTurn: data.data.currentPlayer
    });

    gameBoard.value = {
      ...gameBoard.value,
      [data.data.square]: data.data.currentPlayer === 'Player1' ? SquareState.X : SquareState.O
    };

    moves.value = moves.value + 1;
    boardWatcher();
  },
  resetGame: (data: EndGameDataType) => {
    resetGame();
  }
};
