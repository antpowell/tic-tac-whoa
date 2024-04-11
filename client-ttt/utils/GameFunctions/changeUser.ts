import { Signal } from "@preact/signals-react";

export const changeUser = ({
  currentPlayer,
}: {
  currentPlayer: Signal<"Player1" | "Player2">;
}) => {
  currentPlayer.value =
    currentPlayer.value === "Player1" ? "Player2" : "Player1";
};
