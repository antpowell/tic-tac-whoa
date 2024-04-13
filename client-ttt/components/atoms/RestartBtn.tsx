'use client';
import { getSocketService } from '@/services/socketService';
import getGameContext from '@/utils/state/GameContextState/GameContextState';
import { useSignals } from '@preact/signals-react/runtime';
import { Dialog } from '../organisms/Dialog';
import { Button } from '../ui/button';
import { resetGame } from '@/utils/GameFunctions/resetGame';
import { GameState } from '@/utils/state/GameContextState/GameStateTypes';

export const RestartBtn = () => {
  useSignals();
  const { gameStatus } = getGameContext();

  return (
    <>
      {gameStatus.value !== GameState.InProgress ? (
        <>
          <Dialog />
        </>
      ) : null}
    </>
  );
};
