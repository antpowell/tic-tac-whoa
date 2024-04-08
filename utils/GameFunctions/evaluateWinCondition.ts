import { GameContextSignal } from "../GameContextState";
import { Player1Signal, Player2Signal } from "../PlayerState";

const didPlayerWin = (
  winningArr: Array<number>,
  playerPositions: Array<number>,
) => {
  return winningArr.every((element) => playerPositions.includes(element));
};

export const findWinner = () => {
  console.log("evaluating win condition...");

  let foundWinner = false;

  const winningConditions = new Set([
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [2, 5, 8],
    [1, 4, 7],
    [6, 7, 8],
    [2, 4, 6],
  ]);

  let playerPositions =
    GameContextSignal.value.currentTurn === "Player1"
      ? Player1Signal.value.playerPositions.peek()
      : Player2Signal.value.playerPositions.peek();

  console.log(playerPositions);

  winningConditions.forEach((winningSet) => {
    if (didPlayerWin(winningSet, playerPositions)) {
      console.log(`${GameContextSignal.value.currentTurn} Wins!`);
      foundWinner = true;
    }
  });

  return foundWinner;
};
