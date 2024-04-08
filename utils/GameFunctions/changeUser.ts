import { CurrentTurnStateSignal } from "../GameContextState";

export const changeUser = () => {
  CurrentTurnStateSignal.value =
    CurrentTurnStateSignal.value === "Player1" ? "Player2" : "Player1";
};
