"use client";
import { SquareState } from "@/utils/SquareState";
import { Signal, signal } from "@preact/signals-react";

export const Square = ({
  index,
  onClick,
}: {
  index: number;
  onClick: (playersMark: Signal<SquareState>) => void;
}) => {
  let playersMark = signal(SquareState.EMPTY);
  return (
    <div
      className="flex w-1/3 flex-grow items-center justify-center self-stretch border border-neutral-200 text-4xl text-white"
      onClick={() => onClick(playersMark)}
    >
      {playersMark}
      {/* {value} */}
    </div>
  );
};
