'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { getSocketService } from '@/services/socketService';
import { computed, signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { BattleStage } from './BattleStage';

export const playerNameInput = signal<string>('');
export const playersInBattle = signal<Record<string, { id: string; name: string; iconText: string }>>({});
export const isRoomFull = signal<boolean>(false);

export const GameSearchSideBar = () => {
  useSignals();

  // WORKAROUND: Workaround to fix hydration issues with React and shadcn
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // END WORKAROUND

  const battleStage = computed(() => <BattleStage playing={isRoomFull} />);

  return (
    <>
      <Sheet open={mounted && !isRoomFull.value}>
        <SheetContent
          onInteractOutside={e => {
            e.preventDefault();
          }}
          side={'left'}
          className="flex flex-col justify-around">
          <SheetHeader>
            <SheetTitle>Find an opponent</SheetTitle>
            <SheetDescription>Enter your name to search for an opponent</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-6">
            <Input placeholder="Search..." onChange={e => (playerNameInput.value = e.target.value)} />
            <Button onClick={() => getSocketService().emit('searchForRoom', { name: playerNameInput.peek() })}>
              Search
            </Button>
            {battleStage.value}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
