import { Square } from '@/components/atoms/Square';
import { getSocketService } from '@/services/socketService';
import getGameContext from '@/utils/state/GameContextState/GameContextState';
import { createGameBoard } from '@/utils/GameFunctions/createGameBoard';
import { SquareState } from '@/utils/SquareState';
import { useSignals } from '@preact/signals-react/runtime';

export const GameBoard = () => {
  return (
    <div className="flex h-[600px] w-[600px] flex-wrap ">
      {createGameBoard().map((_, index) => (
        <Square key={index} index={index} />
      ))}
    </div>
  );
};
