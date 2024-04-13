import getGameContext from '../state/GameContextState/GameContextState';
import { dialogOpen, dialogSignal } from '@/components/organisms/Dialog';
import { GameState } from '../state/GameContextState/GameStateTypes';

import { resetGame } from './resetGame';
import { getSocketService } from '@/services/socketService';
import { addToScoreBoard } from './addToScoreBoard';
import { Player1Signal, Player2Signal } from '../PlayerState';

const { currentPlayer, gameStatus, roomId } = getGameContext();

export const handleWinState = (winner: 'Player1' | 'Player2') => {
  const socketService = getSocketService().connect();

  const youWon = winner === currentPlayer.value;
  const getWinnerId = youWon ? Player1Signal.value.playerId.peek() : Player2Signal.value.playerId.peek();
  const p1 =
    Player1Signal.value.inGameId.peek() === '1'
      ? Player1Signal.value.playerId.peek()
      : Player2Signal.value.playerId.peek();

  const p2 =
    Player1Signal.value.inGameId.peek() === '2'
      ? Player1Signal.value.playerId.peek()
      : Player2Signal.value.playerId.peek();

  addToScoreBoard({
    game_id: roomId.value,
    p1,
    p2,
    winners_id: getWinnerId
  });

  const title = `${winner} Wins!`;
  const description = youWon ? 'Nice Job!' : 'Better luck next time!';
  console.log(title);
  console.log(description);
  dialogSignal.value = {
    ...dialogSignal.value,
    title: title,
    description: description,
    open: true,
    cancelButtonText: 'Close',
    continueButtonText: 'Play Again',
    onCancel: () => {
      dialogOpen.value = false;
    },
    onContinue: () => {
      resetGame();
      socketService.emit('resetGame', { winner: getWinnerId });
    }
  };

  gameStatus.value = GameState.GameOver;

  dialogOpen.value = true;
};
