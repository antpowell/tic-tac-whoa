import { Dialog, dialogSignal } from "@/components/organisms/Dialog";
import { GameBoardStateSignal } from "../GameBoardState";
import { GameContextSignal } from "../GameContextState";

export const canPlayerMarkBePlaced = (square: number): boolean => {
  console.log("Cannot click on a filled square");
  GameContextSignal.value.winner.value !== "" &&
    Dialog({
      title: "Game Over",
      description: `The winner is ${GameContextSignal.value.winner.value}`,
      continueButtonText: "Play Again",
      cancelButtonText: "Cancel",
    });

  const isSquareEmpty =
    GameBoardStateSignal.value[square] === null ? true : false;

  if (!isSquareEmpty) {
    // Dialog({
    //   title: "Invalid Move",
    //   description: "That square is already filled!",
    //   continueButtonText: "Continue",
    //   cancelButtonText: "Cancel",
    // });
    console.log(`opening dialog`);
    dialogSignal.value.open = true;
  }

  return isSquareEmpty;
};
