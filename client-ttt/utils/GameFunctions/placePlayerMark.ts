import { SquareState } from "../SquareState";

export const placePlayerMark = ({
  player,
  square,
  board,
}: {
  player: "Player1" | "Player2";
  square: number;
  board: SquareState[];
}) => {
  board[square] = player === "Player1" ? SquareState.X : SquareState.O;
};
