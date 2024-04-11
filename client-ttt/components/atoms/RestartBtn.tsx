'use client';
import { getSocketService } from '@/services/socketService';
import getGameContext, { GameState } from '@/utils/GameContextState';
import { useSignals } from '@preact/signals-react/runtime';
import { Dialog } from '../organisms/Dialog';
import { Button } from '../ui/button';

export const RestartBtn = () => {
  useSignals();
  const { gameStatus, resetGame } = getGameContext();

  const socketService = getSocketService().connect();
  // useSignalEffect(() => {
  //   console.log(`game status: ${gameStatus.value}`);
  // });

  return (
    <>
      {gameStatus.value !== GameState.InProgress ? (
        <>
          <Dialog />
          <Button
            variant={'outline'}
            onClick={() => {
              socketService.emit('resetGame', {});
              resetGame();
            }}>
            Play Again
          </Button>
        </>
      ) : null}
    </>
  );
};
