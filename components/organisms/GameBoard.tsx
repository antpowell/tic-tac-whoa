"use client";
import { Square } from "@/components/atoms/Square";
import { GameBoardStateSignal } from "@/utils/GameBoardState";
import {
  CurrentTurnStateSignal,
  GameContextSignal,
  GameState,
  SwapTurns,
  boardWatcher,
} from "@/utils/GameContextState";
import { canPlayerMarkBePlaced } from "@/utils/GameFunctions/canPlayerMarkBePlaced";
import { changeUser } from "@/utils/GameFunctions/changeUser";
import { findWinner } from "@/utils/GameFunctions/evaluateWinCondition";
import { Player1Signal, Player2Signal } from "@/utils/PlayerState";
import { SquareState } from "@/utils/SquareState";
import { effect, useSignalEffect } from "@preact/signals-react";

effect(() => {
  // console.log(`${GameContextSignal.value.moves}`);
  if (GameContextSignal.value && GameContextSignal.value.moves > 4) {
    console.log(`evaluating game board...`);
  }
});
export const GameBoard = () => {
  boardWatcher();

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

            if (canPlayerMarkBePlaced(index)) {
              continue;
              playersMark.value =
                CurrentTurnStateSignal.value === "Player1"
                  ? SquareState.X
                  : SquareState.O;

              GameBoardStateSignal.value[index] = playersMark.value;

              CurrentTurnStateSignal.peek() === "Player1"
                ? Player1Signal.value.playerPositions.value.push(index)
                : Player2Signal.value.playerPositions.value.push(index);

              console.log(GameBoardStateSignal.value);

              console.log(
                `Player1Signal: ${JSON.stringify(Player1Signal.peek(), null, 2)}`,
              );
              console.log(
                `Player2Signal: ${JSON.stringify(Player2Signal.peek(), null, 2)}`,
              );

              changeUser();

              GameContextSignal.value.moves = GameContextSignal.value.moves + 1;

              // if (GameContextSignal.value.moves > 4) {
              //   console.log(`evaluating game board...`);
              //   findWinner() ? alert("Winner!") : null;
              // }

              if (GameContextSignal.value.moves === 9) {
                GameContextSignal.value.gameStatus = GameState.Draw;
                alert("Draw!");
              }
            }
          }}
        />
      ))}
    </div>
  );
};
