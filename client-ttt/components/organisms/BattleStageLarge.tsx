'use client';
import { useComputed, useSignals } from '@preact/signals-react/runtime';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { isRoomFull, playersInBattle, nextTurn } from '@/utils/Signals/signals';
import { Label } from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import getGameContext from '@/utils/state/GameContextState/GameContextState';
import next from 'next';

export const BattleStageLarge = () => {
  useSignals();

  const { currentPlayer } = getGameContext();

  const activeTurn = useComputed(() => (nextTurn.value === 'Player2' ? 'Player1' : 'Player2'));

  const constructUserProfileDisplay = () => {
    const users = Object.entries(playersInBattle.value);
    let order = `order-0`;
    return users.map((userData, index) => {
      if (index == 1) order = `order-2`;
      return (
        <div key={userData[1].id} className={`${order}`}>
          <div className="flex items-center gap-4 ">
            <Avatar className={`hidden h-20 w-20 sm:flex ${order}`}>
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
              <AvatarFallback>{userData[1].iconText}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-lg font-medium leading-none">{userData[0]}</p>
              <p className="text-base text-muted-foreground">Player{userData[1].id}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex pb-16 justify-between items-center">
      <>
        {constructUserProfileDisplay()}
        <div className="flex flex-col text-xl items-center">
          {isRoomFull.value === true ? <Label className="ml-2 order-1">Your Up: {activeTurn.value}</Label> : null}
          {isRoomFull.value === true ? (
            <Label className="ml-2 order-1 text-xs text-muted">Next Turn: {nextTurn.value}</Label>
          ) : null}
        </div>
      </>
    </div>
  );
};
