'use client';
import { useSignals } from '@preact/signals-react/runtime';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { isRoomFull, playersInBattle, nextTurn } from '@/utils/Signals/signals';

export const BattleStageLarge = () => {
  useSignals();

  const constructUserProfileDisplay = () => {
    const users = Object.entries(playersInBattle.value);
    return users.map(userData => {
      return (
        <div key={userData[1].id}>
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-20 w-20 sm:flex">
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

  return <div className="flex pb-16 justify-between">{constructUserProfileDisplay()}</div>;
};
