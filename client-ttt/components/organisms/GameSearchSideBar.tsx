'use client';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useSignals } from '@preact/signals-react/runtime';
import { useEffect, useState } from 'react';
import { SearchForm } from '../molecules/SearchForm';
import { BattleStage } from './BattleStage';
import { isRoomFull } from '@/utils/Signals/signals';
import ScoreBoard from './ScoreBoard';

export const GameSearchSideBar = () => {
  useSignals();
  // WORKAROUND: Workaround to fix hydration issues with React and shadcn
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // END WORKAROUND

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
          <ScoreBoard />
          <div className="flex flex-col gap-6">
            <BattleStage />
            <SearchForm />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
