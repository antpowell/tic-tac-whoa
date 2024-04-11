import { Signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { playersInBattle } from './GameSearchSideBar';

export const BattleStage = ({ playing }: { playing: Signal<boolean> }) => {
  useSignals();

  const constructUserProfileDisplay = () => {
    const users = Object.entries(playersInBattle.value);
    return users.map(userData => {
      return (
        <div key={userData[1].id}>
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
              <AvatarFallback>{userData[1].iconText}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{userData[0]}</p>
              <p className="text-sm text-muted-foreground">Player{userData[1].id}</p>
            </div>
            <div className="ml-auto font-medium">{playing.value ? 'Playing...' : 'Waiting...'}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {constructUserProfileDisplay()}
      {/* {users.value.map((user, index) => (
        <div key={index}>
          Player{index + 1}: {user}
        </div>
      ))} */}
    </div>
  );
};
