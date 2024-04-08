import { GameBoardStateSignal } from "../GameBoardState";
import { SquareState } from "../SquareState";

export const placePlayerMark = ({player,square}:{player: "Player1" | "Player2", square: number}) => {
  GameBoardStateSignal.value[square] = player === "Player1" ? SquareState.X : SquareState.O;
}