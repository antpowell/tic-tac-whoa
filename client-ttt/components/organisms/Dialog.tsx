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

export const dialogOpen = signal(false);

const showDialog = computed(() => {
  return !!dialogSignal.value.open;
});

// const onOpenChange = (open: boolean) => {
//   open === true ? (dialogOpen.value = false) : (dialogOpen.value = true);
// };

// export const openDialog = (dialog: DialogProps) => {
//   dialogSignal.value = dialog;
// };

export const Dialog = () => {
  console.log(`opening dialog...`);
  console.log(`dialogOpen: ${dialogOpen.value}`);
  useSignals();
  return (
    // <AlertDialog
    //   open={dialogSignal.value.open as unknown as boolean}
    //   // onOpenChange={}
    // >
    <AlertDialog
      // open={showDialog.value}
      defaultOpen={true}
      // onOpenChange={(open) => {
      //   open ? (dialogOpen.value = true) : (dialogOpen.value = false);
      // }}
    >
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
  );
};
