'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import getGameContext from '@/utils/state/GameContextState/GameContextState';
import { GameState } from '@/utils/state/GameContextState/GameStateTypes';

import { computed, signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';

export interface DialogProps {
  title: string;
  description: string;
  continueButtonText: string;
  cancelButtonText: string;
  open: boolean;
  onContinue?: () => void;
  onCancel?: () => void;
}

export const dialogSignal = signal<DialogProps>({
  title: 'Title',
  description: 'Description',
  continueButtonText: 'Continue',
  cancelButtonText: 'Cancel',
  open: false,
  onContinue: () => {},
  onCancel: () => {}
});

export const dialogOpen = signal<boolean>(false);

export const Dialog = () => {
  console.log(`opening dialog...`);
  const { gameStatus } = getGameContext();

  useSignals();
  return (
    <>
      {gameStatus.value !== GameState.InProgress ? (
        <>
          <AlertDialog defaultOpen={true}>
            <AlertDialogTrigger />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{dialogSignal.value.title}</AlertDialogTitle>
                <AlertDialogDescription>{dialogSignal.value.description}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={dialogSignal.value.onCancel}>
                  {dialogSignal.value.cancelButtonText}
                </AlertDialogCancel>
                <AlertDialogAction onClick={dialogSignal.value.onContinue}>
                  {dialogSignal.value.continueButtonText}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : null}
    </>
  );
};
