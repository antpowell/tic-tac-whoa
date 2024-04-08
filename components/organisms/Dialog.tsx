"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/organisms/alert-dialog";
import { Button } from "../atoms/button";
import { signal, useSignal, useSignalEffect } from "@preact/signals-react";

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
  title: "Title",
  description: "Description",
  continueButtonText: "Continue",
  cancelButtonText: "Cancel",
  open: false,
  // onContinue: () => (dialogTrigger.value = false),
  // onCancel: () => (dialogTrigger.value = false),
});

export const openDialog = (dialog: DialogProps) => {
  dialogSignal.value = dialog;
};

export const Dialog = () => {
  const dialogTrigger = useSignal(false);

  return (
    // <AlertDialog
    //   open={dialogSignal.value.open as unknown as boolean}
    //   // onOpenChange={}
    // >
    <AlertDialog
      open={dialogTrigger.value}
      // onOpenChange={}
    >
      {/* <AlertDialogTrigger asChild>{dialogSignal}</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogSignal.value.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {dialogSignal.value.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {dialogSignal.value.cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction>
            {dialogSignal.value.continueButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
