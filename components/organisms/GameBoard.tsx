"use client";
import { Square } from "@/components/atoms/Square";
import { GameBoardStateSignal } from "@/utils/GameBoardState";
import {
  CurrentTurnStateSignal,
  GameContextSignal,
  GameState,
  SwapTurns,
} from "@/utils/GameContextState";
import { SquareState } from "@/utils/SquareState";

export const GameBoard = () => {
  return (
    <div className="flex h-[800px] min-h-[600px] w-[800px]  flex-wrap items-stretch ">
      {GameBoardStateSignal.value.map((_, index) => (
        <Square
          key={index}
          index={index}
          onClick={(playersMark) => {
            console.log(
              `Square ${index} clicked by ${CurrentTurnStateSignal.value}`,
            );

            if (playersMark.value !== SquareState.EMPTY) {
              console.log("Cannot click on a filled square");
              return;
            }

            playersMark.value =
              CurrentTurnStateSignal.value === "Player1"
                ? SquareState.X
                : SquareState.O;

            GameBoardStateSignal.value[index] = playersMark;

            console.log(GameBoardStateSignal.value);

            SwapTurns();

            GameContextSignal.value.moves++;

            if (GameContextSignal.value.moves === 9) {
              GameContextSignal.value.gameStatus = GameState.Draw;
            }

            // console.log(GameContextSignal.value.board);
          }}
        />
      ))}
    </div>
  );
};
